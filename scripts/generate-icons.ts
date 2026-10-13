// Menggabungkan dua sumber icon lalu menulis components/ui/element/icons/icons.generated.ts:
//   1. Custom: semua file components/ui/element/icons/svg/*.svg      → name: "arrow-big-down"
//   2. Lucide: nama di components/ui/element/icons/lucide-icons.json → name: "lucide:arrow-down"
// Jalankan: bun run icons
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const CUSTOM_DIR = join(ROOT, "components/ui/element/icons/svg");
const LUCIDE_LIST = join(ROOT, "components/ui/element/icons/lucide-icons.json");
const LUCIDE_DIR = join(ROOT, "node_modules/lucide-static/icons");
const OUT_FILE = join(ROOT, "components/ui/element/icons/icons.generated.ts");

// Atribut root yang diatur oleh komponen <Icon>, jadi dibuang dari file asli.
const IGNORED_ATTRS = new Set(["xmlns", "width", "height", "class", "style"]);
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const toCamel = (attr: string) => attr.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

type IconData = { attrs: Record<string, string>; body: string };

function parseSvg(source: string, label: string): IconData {
    const match = source.match(/<svg([^>]*)>([\s\S]*)<\/svg>/);
    if (!match) throw new Error(`Bukan file SVG yang valid: ${label}`);

    const attrs: Record<string, string> = {};
    for (const [, key, value] of match[1].matchAll(/([\w:-]+)="([^"]*)"/g)) {
        if (!IGNORED_ATTRS.has(key)) attrs[toCamel(key)] = value;
    }

    return { attrs, body: match[2].replace(/>\s+</g, "><").trim() };
}

const icons: Record<string, IconData> = {};

// 1. Custom
const customFiles = readdirSync(CUSTOM_DIR).filter((f) => f.endsWith(".svg")).sort();
for (const file of customFiles) {
    const name = basename(file, ".svg");
    if (!KEBAB_CASE.test(name)) throw new Error(`Nama file icon harus kebab-case: ${file}`);
    icons[name] = parseSvg(readFileSync(join(CUSTOM_DIR, file), "utf8"), file);
}

// 2. Lucide
const lucideNames: string[] = JSON.parse(readFileSync(LUCIDE_LIST, "utf8"));
for (const name of [...new Set(lucideNames)].sort()) {
    const file = join(LUCIDE_DIR, `${name}.svg`);
    if (!existsSync(file)) {
        throw new Error(`Icon lucide "${name}" tidak ditemukan. Cek nama di https://lucide.dev/icons`);
    }
    icons[`lucide:${name}`] = parseSvg(readFileSync(file, "utf8"), `lucide:${name}`);
}

const output = `// FILE INI DIGENERATE OTOMATIS oleh scripts/generate-icons.ts — jangan diedit manual.
// Icon custom: taruh .svg di components/ui/element/icons/svg/.
// Icon lucide: tambahkan nama di components/ui/element/icons/lucide-icons.json.
// Lalu jalankan \`bun run icons\`.

export const icons = ${JSON.stringify(icons, null, 4)} as const;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];
`;

writeFileSync(OUT_FILE, output);
console.log(`✓ ${customFiles.length} icon custom + ${lucideNames.length} icon lucide digenerate ke ${OUT_FILE}`);
