import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./icon";
import { iconNames, type IconName } from "./icons.generated";

const meta = {
    title: "Element/Icon",
    component: Icon,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`tsx
import { Icon, type IconName } from "@/components/ui";

<Icon name="arrow-big-down" className="text-2xl text-blue-700" />
<Icon name="lucide:search" />
\`\`\`
`,
            },
        },
    },
    args: {
        name: iconNames[0],
    },
    argTypes: {
        name: {
            control: "select",
            options: iconNames,
            description: "Custom: nama file di `components/ui/element/icons/svg/`. Lucide: `lucide:<nama>`",
        },
        className: {
            control: "text",
            description: "Ukuran & warna lewat class teks, mis. `text-3xl text-blue-700`",
        },
        title: { control: "text" },
    },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { className: "text-3xl" },
};

export const Sizes: Story = {
    render: (args) => (
        <div className="flex items-end gap-4">
            <Icon {...args} className="text-sm" />
            <Icon {...args} className="text-base" />
            <Icon {...args} className="text-2xl" />
            <Icon {...args} className="text-4xl" />
            <Icon {...args} className="text-6xl" />
        </div>
    ),
};

export const Colors: Story = {
    render: (args) => (
        <div className="flex gap-4 text-4xl">
            <Icon {...args} className="text-slate-900" />
            <Icon {...args} className="text-blue-700" />
            <Icon {...args} className="text-green-600" />
            <Icon {...args} className="text-red-600" />
        </div>
    ),
};

export const InlineWithText: Story = {
    render: (args) => (
        <p className="text-lg text-blue-700">
            <Icon {...args} /> Icon mengikuti ukuran & warna teks di sekitarnya
        </p>
    ),
};

/** Contoh memanggil 1 icon custom dan 1 icon Lucide. Perbedaannya hanya di awalan `lucide:`. */
export const CustomAndLucide: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div className="flex flex-col gap-4 text-lg">
            <p className="flex items-center gap-2 text-blue-700">
                <Icon name="arrow-big-down" className="text-2xl" />
                <code>{`<Icon name="arrow-big-down" />`}</code> → custom
            </p>
            <p className="flex items-center gap-2 text-green-600">
                <Icon name="lucide:arrow-down" className="text-2xl" />
                <code>{`<Icon name="lucide:arrow-down" />`}</code> → Lucide
            </p>
        </div>
    ),
};

const customIcons = iconNames.filter((name) => !name.startsWith("lucide:"));
const lucideIcons = iconNames.filter((name) => name.startsWith("lucide:"));

function IconGrid({ names }: { names: IconName[] }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {names.map((name) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(`<Icon name="${name}" />`)}
                    className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4 text-slate-700 hover:bg-slate-50"
                >
                    <Icon name={name} className="text-3xl" />
                    <span className="text-xs">{name}</span>
                </button>
            ))}
        </div>
    );
}

/** Semua icon yang tersedia, dikelompokkan per sumber. Klik untuk menyalin `<Icon name="..." />`. */
export const Gallery: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-2">
                <h3 className="font-semibold">Custom ({customIcons.length})</h3>
                <IconGrid names={customIcons} />
            </section>
            <section className="flex flex-col gap-2">
                <h3 className="font-semibold">Lucide ({lucideIcons.length})</h3>
                <IconGrid names={lucideIcons} />
            </section>
        </div>
    ),
};
