import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { CartButton, CartProvider, NewsletterForm, ProductCard } from "@/components/store";
import { categories, perks, products, stats, store, testimonials } from "@/lib/store-data";

const navLinks = [
    { href: "#kategori", label: "Kategori" },
    { href: "#produk", label: "Produk" },
    { href: "#cerita", label: "Cerita Kami" },
    { href: "#ulasan", label: "Ulasan" },
];

export default function LandingPage() {
    return (
        <CartProvider>
            <div className="flex min-h-screen w-full flex-col bg-cream text-ink">
                <p className="bg-moss px-4 py-2 text-center text-sm text-white">
                    Gratis ongkir Jawa–Bali untuk belanja di atas Rp500.000
                </p>

                <header className="sticky top-0 z-20 border-b border-sand bg-cream/90 backdrop-blur">
                    <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
                        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
                            {store.name}
                        </Link>
                        <ul className="hidden items-center gap-8 text-sm md:flex">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-muted hover:text-ink">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-1">
                            <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-sand">
                                Masuk
                            </Link>
                            <CartButton />
                        </div>
                    </nav>
                </header>

                <main className="flex-1">
                    {/* Hero */}
                    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
                        <div className="flex flex-col gap-6">
                            <p className="text-sm font-medium tracking-wide text-clay uppercase">Koleksi musim hujan 2026</p>
                            <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
                                Rumah terasa hangat lewat barang buatan tangan.
                            </h1>
                            <p className="max-w-md text-lg text-muted">
                                Keramik, tenun, dan dekorasi dari 120+ perajin di 14 kota. Setiap barang dibuat satu per satu, jadi
                                tidak ada dua yang persis sama.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="#produk"
                                    className="inline-flex h-12 items-center gap-2 rounded-full bg-clay px-6 font-medium text-white hover:bg-clay-dark"
                                >
                                    Belanja sekarang
                                    <Icon name="lucide:arrow-right" />
                                </a>
                                <a
                                    href="#cerita"
                                    className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 font-medium hover:border-ink"
                                >
                                    Kenalan dengan perajin
                                </a>
                            </div>
                            <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-sand pt-6">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <dt className="sr-only">{stat.label}</dt>
                                        <dd className="font-display text-2xl font-semibold sm:text-3xl">{stat.value}</dd>
                                        <dd className="text-sm text-muted">{stat.label}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="relative">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand md:aspect-[5/6]">
                                <Image
                                    src={store.heroImage}
                                    alt="Ruang tamu dengan sofa kulit, hiasan dinding makrame, dan tanaman"
                                    fill
                                    preload
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lg shadow-ink/10 sm:-left-6">
                                <div className="relative size-14 overflow-hidden rounded-xl bg-sand">
                                    <Image src={products[0].image} alt="" fill sizes="56px" className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted">Paling dicari minggu ini</p>
                                    <p className="font-display font-semibold">{products[0].name}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Keunggulan */}
                    <section aria-label="Layanan" className="border-y border-sand">
                        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
                            {perks.map((perk) => (
                                <li key={perk.title} className="flex gap-4">
                                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand text-xl text-clay">
                                        <Icon name={perk.icon} />
                                    </span>
                                    <div>
                                        <h2 className="font-semibold">{perk.title}</h2>
                                        <p className="text-sm text-muted">{perk.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Kategori */}
                    <section id="kategori" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
                        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Belanja per kategori</h2>
                        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {categories.map((category) => (
                                <li key={category.name}>
                                    <a
                                        href="#produk"
                                        className="group relative block aspect-square overflow-hidden rounded-2xl bg-sand"
                                    >
                                        <Image
                                            src={category.image}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 25vw, 50vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                                        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                                            <span>
                                                <span className="block font-display text-xl font-semibold">{category.name}</span>
                                                <span className="text-sm text-white/85">{category.count} produk</span>
                                            </span>
                                            <Icon name="lucide:arrow-up-right" className="text-xl" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Produk */}
                    <section id="produk" className="scroll-mt-20 bg-white">
                        <div className="mx-auto max-w-6xl px-4 py-20">
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Pilihan minggu ini</h2>
                                    <p className="mt-2 text-muted">Barang yang paling sering masuk keranjang pelanggan kami.</p>
                                </div>
                                <p className="text-sm text-muted">{products.length} produk</p>
                            </div>
                            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Cerita */}
                    <section id="cerita" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-12 px-4 py-20 md:grid-cols-2">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
                            <Image
                                src={store.storyImage}
                                alt="Vas gerabah putih di samping tanaman"
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-6">
                            <p className="text-sm font-medium tracking-wide text-clay uppercase">Cerita kami</p>
                            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                Kami datangi bengkelnya, bukan cuma katalognya.
                            </h2>
                            <p className="text-muted">
                                Sejak 2019 kami keliling dari Kasongan sampai Waingapu, duduk bersama perajin, dan memilih barang
                                yang kami sendiri mau pakai di rumah. Perajin menentukan harganya sendiri, dan 70% dari setiap
                                penjualan kembali ke mereka.
                            </p>
                            <ul className="flex flex-col gap-3">
                                {[
                                    "Bahan lokal: tanah liat, serat alam, dan kapas tenun",
                                    "Diproduksi dalam jumlah kecil, bukan pabrik",
                                    "Setiap paket berisi kartu cerita dari pembuatnya",
                                ].map((point) => (
                                    <li key={point} className="flex items-start gap-3">
                                        <Icon name="lucide:leaf" className="mt-1 text-moss" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Ulasan */}
                    <section id="ulasan" className="scroll-mt-20 bg-sand/60">
                        <div className="mx-auto max-w-6xl px-4 py-20">
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Kata mereka yang sudah belanja</h2>
                            <ul className="mt-10 grid gap-6 md:grid-cols-3">
                                {testimonials.map((testimonial) => (
                                    <li key={testimonial.name}>
                                        <figure className="flex h-full flex-col gap-6 rounded-2xl bg-white p-6">
                                            <p className="flex gap-0.5 text-clay" aria-label="5 dari 5 bintang">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <Icon key={i} name="lucide:star" className="fill-current" />
                                                ))}
                                            </p>
                                            <blockquote className="flex-1 leading-relaxed">“{testimonial.quote}”</blockquote>
                                            <figcaption className="border-t border-sand pt-4 text-sm">
                                                <span className="font-semibold">{testimonial.name}</span>
                                                <span className="text-muted"> · {testimonial.city}</span>
                                                <span className="block text-muted">Membeli {testimonial.product}</span>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Newsletter */}
                    <section className="mx-auto max-w-6xl px-4 py-20">
                        <div className="flex flex-col gap-8 rounded-[2rem] bg-ink px-6 py-12 text-cream sm:px-12 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-md">
                                <h2 className="font-display text-3xl font-semibold tracking-tight">Diskon 10% untuk pesanan pertama</h2>
                                <p className="mt-2 text-cream/80">
                                    Daftar email untuk dapat kode diskon dan kabar koleksi baru, paling banyak dua kali sebulan.
                                </p>
                            </div>
                            <div className="w-full md:max-w-md">
                                <NewsletterForm />
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-sand">
                    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
                        <div className="sm:col-span-2">
                            <p className="font-display text-xl font-semibold">{store.name}</p>
                            <p className="mt-2 max-w-xs text-sm text-muted">{store.tagline}.</p>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold">Belanja</p>
                            <ul className="mt-3 flex flex-col gap-2 text-muted">
                                {categories.map((category) => (
                                    <li key={category.name}>
                                        <a href="#produk" className="hover:text-ink">
                                            {category.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold">Kontak</p>
                            <ul className="mt-3 flex flex-col gap-2 text-muted">
                                <li className="flex items-start gap-2">
                                    <Icon name="lucide:map-pin" className="mt-0.5" />
                                    {store.address}
                                </li>
                                <li className="flex items-center gap-2">
                                    <Icon name="lucide:mail" />
                                    <a href={`mailto:${store.email}`} className="hover:text-ink">
                                        {store.email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="border-t border-sand py-6 text-center text-sm text-muted">
                        © 2026 {store.name}. Data di halaman ini adalah contoh.
                    </p>
                </footer>
            </div>
        </CartProvider>
    );
}
