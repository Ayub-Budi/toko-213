# setup-nextjs

Template Next.js (App Router) dengan Tailwind CSS, komponen UI yang bisa dipakai ulang, sistem icon (custom + Lucide), sidebar, client API berbasis axios, landing page, contoh login dan dashboard, serta dokumentasi komponen di Storybook.

## Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack), React 19.3 |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Package manager | Bun 1.2 |
| Dokumentasi UI | Storybook 10 (`@storybook/nextjs-vite`) |
| Icon | SVG custom + Lucide (`lucide-static`) |
| HTTP client | axios |
| Lint | ESLint 9 + `eslint-config-next` |

## Mulai

```bash
bun install
cp .env.example .env.local   # isi NEXT_PUBLIC_API_URL
bun run dev                  # http://localhost:3000
```

Secara default, contoh memakai API demo [dummyjson.com](https://dummyjson.com). Login dengan `emilys` / `emilyspass`.

| Script | Fungsi |
| --- | --- |
| `bun run dev` | Generate icon lalu jalankan dev server |
| `bun run build` | Generate icon lalu build produksi |
| `bun run start` | Jalankan hasil build |
| `bun run lint` | Cek kode dengan ESLint |
| `bun run icons` | Generate `components/ui/element/icons/icons.generated.ts` dari folder SVG |
| `bun run storybook` | Storybook di http://localhost:6006 |
| `bun run build-storybook` | Build Storybook statis ke `storybook-static/` |

---

# Arsitektur

## Struktur Folder

```
.
├── app/                    # Routing (App Router): layout, page, dan route
│   ├── layout.tsx          # Root layout: font Geist dan globals.css
│   ├── (landing)/page.tsx  # Landing page "/" (publik)
│   ├── (auth)/login/       # Halaman /login (publik, tanpa sidebar)
│   ├── (dashboard)/        # Halaman yang butuh login, memakai layout dengan sidebar
│   │   ├── layout.tsx
│   │   └── dashboard/page.tsx  # Halaman /dashboard
│   ├── api/                # Route handler (kosong)
│   └── globals.css         # Tailwind dan design token (CSS variables)
├── components/
│   ├── ui/                 # Komponen dasar, dikelompokkan per kategori (+ *.stories.tsx)
│   │   ├── element/        # Button, Icon, ...
│   │   │   └── icons/      # Komponen <Icon>, file SVG, dan icons.generated.ts
│   │   ├── form/           # Input, ...
│   │   └── index.ts        # Export gabungan: import { Button, Input } from "@/components/ui"
│   └── layout/             # Komponen tata letak: Header, Sidebar, Footer (+ index.ts)
├── services/               # Fungsi akses data per fitur (auth.service.ts, user.service.ts)
├── lib/
│   ├── api.ts              # Instance axios: baseURL, token, penanganan 401
│   ├── session.ts          # Simpan/baca/hapus token di cookie
│   └── navigation.ts       # Data menu sidebar
├── types/                  # Tipe bersama (auth.ts, user.ts, navigation.ts)
├── proxy.ts                # Cek login sebelum halaman dirender (Next 16: pengganti middleware.ts)
├── scripts/                # Script build (generate-icons.ts)
├── public/                 # File statis yang diakses lewat URL
├── .storybook/             # Konfigurasi Storybook
└── next.config.ts
```

## Lapisan dan Aturan Dependensi

```
app/  (route & halaman)
 │
 ├──▶ components/layout ──▶ components/ui  (termasuk element/icons)
 │
 └──▶ services/ ──▶ lib/
            │
            └──▶ types/   (boleh dipakai oleh semua lapisan)
```

| Lapisan | Tanggung jawab | Boleh import dari |
| --- | --- | --- |
| `app/` | Routing, mengambil data di Server Component, menyusun halaman | semua lapisan |
| `components/layout/` | Kerangka halaman (header, navigasi, footer) | `ui`, `lib`, `types` |
| `components/ui/` | Komponen tampilan murni tanpa fetch data dan tanpa logika bisnis (termasuk `<Icon>` di `element/icons/`) | `lib`, `types` |
| `services/` | Fungsi pengambil dan pengubah data (`getUsers()`, `createOrder()`) | `lib`, `types` |
| `lib/` | Utilitas murni | `types` |
| `types/` | Definisi tipe | – |

Panah dependensi hanya mengarah ke bawah. Contohnya, `components/ui` tidak boleh mengimport `services` atau `app`.

Import selalu memakai alias `@/` yang mengarah ke root project, misalnya `import { Button, Input } from "@/components/ui"` atau `import { Sidebar } from "@/components/layout"`.

## API dan Service

```
Komponen / page  ──▶  services/*.service.ts  ──▶  lib/api.ts (axios)  ──▶  Backend
                       (login, getUsers)          (token + 401)          (NEXT_PUBLIC_API_URL)
```

**`lib/api.ts`** adalah satu instance axios untuk semua request:

```ts
import { api } from "@/lib/api";

const { data } = await api.get<User>("/auth/me");
const { data } = await api.post<LoginResponse>("/auth/login", { username, password });
const { data } = await api.get("/users", { params: { limit: 5 } });
```

- **`baseURL`** diambil dari `NEXT_PUBLIC_API_URL`.
- **Header `Authorization: Bearer <token>`** ditambahkan otomatis kalau user sudah login.
- **Respons 401:** token dihapus, lalu user diarahkan ke `/login`.
- **`getErrorMessage(error)`** mengambil pesan error yang bisa ditampilkan ke user.

**`services/`**: komponen tidak memanggil `api` langsung, tapi lewat fungsi service. Contoh:

```ts
// services/user.service.ts
export async function getUsers({ limit = 10, skip = 0 } = {}): Promise<Paginated<User>> {
    const { data } = await api.get<UsersResponse>("/users", { params: { limit, skip } });
    return { items: data.users, total: data.total, skip: data.skip, limit: data.limit };
}
```

Service mengubah response backend ke tipe di `types/`. Jadi kalau format API berubah, cukup service yang disesuaikan, bukan semua komponen.

Untuk menambah fitur baru, buat `services/<fitur>.service.ts` dan tipe-nya di `types/<fitur>.ts`.

## Halaman dan Route Group

| URL | File | Akses | Layout |
| --- | --- | --- | --- |
| `/` | `app/(landing)/page.tsx` | Publik | Navbar dan footer landing |
| `/login` | `app/(auth)/login/page.tsx` | Publik (sudah login → `/dashboard`) | Tanpa sidebar |
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Butuh login | `app/(dashboard)/layout.tsx` (sidebar) |

Nama folder dalam kurung, seperti `(landing)`, adalah *route group*. Folder ini tidak muncul di URL, tapi bisa punya layout sendiri. Halaman baru yang butuh sidebar ditaruh di `app/(dashboard)/`, misalnya `app/(dashboard)/users/page.tsx` untuk `/users`. Halaman publik baru juga harus ditambahkan ke `PUBLIC_PATHS` di `proxy.ts`.

## Autentikasi

1. **Login:** `/login` memanggil `login()` dari `services/auth.service.ts`, menyimpan token di cookie `token` lewat `lib/session.ts`, lalu masuk ke `/dashboard`.
2. **Cek di proxy:** `proxy.ts` membaca cookie itu di setiap request.
   - Halaman publik ada di `PUBLIC_PATHS`, yaitu `/` (landing) dan `/login`. Selain itu, semua halaman butuh login, dan user yang belum login diarahkan ke `/login`.
   - Kalau sudah login, membuka `/login` diarahkan ke `/dashboard`.
3. **Token tidak valid:** kalau backend membalas 401, `lib/api.ts` menghapus token dan kembali ke `/login`.
4. **Logout:** `logout()` menghapus cookie.

Middleware hanya memeriksa apakah cookie ada, bukan apakah token-nya valid. Validasi tetap terjadi di backend.

Cookie ini bukan `httpOnly` karena perlu dibaca axios di browser. Untuk produksi yang lebih aman, pertimbangkan login lewat route handler di `app/api/` yang memasang cookie `httpOnly`.

## Server dan Client Component

- Secara default, semua file di `app/` adalah **Server Component**.
- Service di contoh ini (`auth.service.ts`, `user.service.ts`) dipanggil dari **Client Component**, karena token dibaca dari cookie di browser oleh `lib/api.ts`. Contohnya halaman login dan dashboard, yang memakai `"use client"` dan memanggil service di `useEffect` atau di handler submit.
- Tambahkan `"use client"` hanya di komponen yang butuh state, event handler, atau API browser. Pakai sesedikit mungkin dan letakkan sedalam mungkin di pohon komponen.
- `Button`, `Input`, dan `Sidebar` memakai `"use client"`. `Icon` tidak memakainya, jadi bisa dipakai di Server Component.

## Caching dan Rendering

`next.config.ts` mengaktifkan dua opsi:

- **`cacheComponents: true`**: halaman di-prerender sebisa mungkin. Data yang ingin di-cache ditandai dengan directive `"use cache"` di fungsi `services/` atau di komponen. Data dinamis dibungkus dengan `<Suspense>`.
- **`partialPrefetching: true`**: router melakukan prefetch App Shell (bagian statis) dari setiap route secara default.

Panduan lengkapnya ada di `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`. Versi Next.js ini punya perubahan dibanding versi lama, jadi rujuk dokumen tersebut daripada tutorial lama.

## Styling

- Tailwind v4 dimuat lewat `@import "tailwindcss"` di `app/globals.css`. Tidak ada `tailwind.config.js`; token tambahan ditulis di blok `@theme`.
- **Next.js** memproses CSS dengan loader `@tailwindcss/turbopack` (lihat `turbopack.rules` di `next.config.ts`).
- **Storybook** berjalan di atas Vite, jadi memakai plugin `@tailwindcss/vite` (lihat `.storybook/main.ts`). Kalau konfigurasi Tailwind berubah, pastikan keduanya tetap sinkron.
- Warna latar dan teks dasar memakai CSS variable `--background` dan `--foreground`, yang otomatis berganti saat dark mode.

## Alur Icon

```
components/ui/element/icons/svg/*.svg          →  "arrow-big-down"      (custom)
components/ui/element/icons/lucide-icons.json  →  "lucide:arrow-down"   (dari paket lucide-static)
        │  bun run icons  (scripts/generate-icons.ts)
        ▼
components/ui/element/icons/icons.generated.ts   →  { name: { attrs, body } } + tipe IconName
        │
        ▼
<Icon name="..." />   →  <svg width="1em" height="1em" fill/stroke="currentColor">
```

Icon custom dan Lucide dibedakan lewat prefix nama: icon Lucide selalu diawali `lucide:`. Kedua sumber digabung ke satu file, jadi `<Icon>` merendernya dengan cara yang sama. Hanya icon Lucide yang tercantum di `lucide-icons.json` yang masuk bundle, bukan seluruh 1.600-an icon Lucide.

Script membaca setiap file SVG, membuang atribut `width`, `height`, dan `class`, lalu mengubah atribut kebab-case menjadi camelCase. Hasilnya disimpan sebagai objek TypeScript, sehingga `name` punya autocomplete dan tidak perlu loader SVG khusus di Next.js maupun Vite.

## Storybook

- Story ditulis di sebelah komponennya (`button.tsx` dan `button.stories.tsx`).
- `tags: ["autodocs"]` di `.storybook/preview.ts` membuat halaman Docs otomatis dari props TypeScript.
- `components/Introduction.mdx` adalah halaman pembuka Storybook.
- **Jangan pakai `parameters.nextjs.appDirectory: true`.** Mock App Router di Storybook 10.6 belum cocok dengan Next 16.4 dan memunculkan error `Cannot read properties of undefined (reading 'data')`. Untuk komponen yang memakai `usePathname` atau hook navigasi lain, tiru nilainya lewat `beforeEach` seperti di `components/layout/sidebar.stories.tsx`:

```ts
import { usePathname } from "@storybook/nextjs-vite/navigation.mock";

export const Active: Story = {
    beforeEach: () => { usePathname.mockReturnValue("/users"); },
};
```

---

# Komponen UI

Dokumentasi tiap komponen (props, variant, dan contoh pemakaian) ada di **Storybook**. Jalankan `bun run storybook` lalu buka http://localhost:6006.

## Struktur

```
components/
├── ui/
│   ├── element/                # Elemen dasar (tombol, icon, ...)
│   │   ├── <nama>.tsx          # Komponen
│   │   ├── <nama>.stories.tsx  # Story + halaman Docs di Storybook
│   │   ├── icons/
│   │   │   ├── icon.tsx            # Komponen <Icon name="..." />
│   │   │   ├── svg/                # Icon custom (*.svg)
│   │   │   ├── lucide-icons.json   # Daftar icon Lucide yang dipakai
│   │   │   └── icons.generated.ts  # Dibuat otomatis oleh `bun run icons`
│   │   └── index.ts            # Export semua komponen element
│   ├── form/                   # Kontrol form (input, select, ...)
│   │   ├── <nama>.tsx
│   │   ├── <nama>.stories.tsx
│   │   └── index.ts            # Export semua komponen form
│   └── index.ts                # Export gabungan element + form
├── layout/                     # Kerangka halaman (sidebar, header, ...)
│   ├── <nama>.tsx
│   ├── <nama>.stories.tsx
│   └── index.ts                # Export semua komponen layout
└── Introduction.mdx            # Halaman pembuka Storybook
```

## Konvensi

- Satu komponen per file, dengan nama file kebab-case dan nama export PascalCase (`button.tsx` → `Button`).
- Props meng-extend `React.ComponentProps<"elemen">`, jadi semua atribut HTML bawaan tetap bisa dipakai.
- Story ditulis di sebelah komponennya. Halaman Docs di Storybook dibuat otomatis dari props TypeScript.
- Komponen di `ui/` hanya mengurus tampilan: tanpa fetch data dan tanpa logika bisnis.
- Ukuran dan warna icon mengikuti class teks, misalnya `text-xl text-blue-700`.

## Menambah

| Yang ditambah | Langkah |
| --- | --- |
| Komponen | Buat `components/ui/<kategori>/<nama>.tsx` dan `<nama>.stories.tsx` (title `Kategori/Nama`), lalu tambahkan `export { Nama } from "./<nama>";` di `index.ts` folder kategorinya |
| Icon custom | Simpan `.svg` (kebab-case, memakai `currentColor`) di `components/ui/element/icons/svg/`, lalu jalankan `bun run icons` |
| Icon Lucide | Tambahkan nama dari https://lucide.dev/icons ke `components/ui/element/icons/lucide-icons.json`, lalu jalankan `bun run icons` |
| Menu sidebar | Tambahkan item di `lib/navigation.ts`: pakai `to` untuk link langsung, atau `childrens` untuk grup |
