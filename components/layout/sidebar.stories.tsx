import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname } from "@storybook/nextjs-vite/navigation.mock";
import { sidebarItems } from "@/lib/navigation";
import { Sidebar } from "./sidebar";

// Mock App Router Storybook 10.6 belum cocok dengan Next.js 16.4 (`appDirectory: true` error
// "Cannot read properties of undefined (reading 'data')"), jadi pathname di-mock langsung.
const withPathname = (pathname: string) => () => {
    usePathname.mockReturnValue(pathname);
};

const meta = {
    title: "Layout/Sidebar",
    component: Sidebar,
    args: {
        items: sidebarItems,
        title: "My App",
    },
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: `
\`\`\`tsx
import { Sidebar } from "@/components/layout";
import { sidebarItems } from "@/lib/navigation";

<Sidebar items={sidebarItems} title="My App" />
\`\`\`
`,
            },
        },
    },
    beforeEach: withPathname("/dashboard"),
    decorators: [
        (Story) => (
            <div className="flex min-h-screen bg-slate-50">
                <Story />
                <div className="flex-1 p-6 text-slate-500">Konten halaman</div>
            </div>
        ),
    ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Link induk tanpa children sedang aktif. */
export const Default: Story = {};

/** Salah satu child aktif, jadi grup induknya otomatis terbuka. */
export const ActiveChild: Story = {
    beforeEach: withPathname("/users/create"),
};
