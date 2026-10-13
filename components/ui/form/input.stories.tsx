import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Input } from "./input";

const meta = {
    title: "Form/Input",
    component: Input,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`tsx
import { Input } from "@/components/ui";

<Input label="Email" name="email" type="email" placeholder="nama@email.com" />
\`\`\`
`,
            },
        },
    },
    args: {
        onChange: fn(),
    },
    argTypes: {
        label: { description: "Label di atas input" },
        error: { control: "text", description: "Pesan error; border jadi merah dan pesan muncul di bawah input" },
        type: {
            control: "select",
            options: ["text", "email", "password", "number", "tel", "url", "search", "date", "time", "file"],
        },
        placeholder: { control: "text" },
        disabled: { control: "boolean" },
        required: { control: "boolean" },
    },
    decorators: [
        (Story) => (
            <div className="max-w-sm">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { placeholder: "Ketik sesuatu..." },
};

export const WithLabel: Story = {
    args: { label: "Nama", name: "name", placeholder: "John Doe" },
};

export const Email: Story = {
    args: { label: "Email", type: "email", name: "email", placeholder: "nama@email.com", required: true },
};

export const Password: Story = {
    args: { label: "Password", type: "password", name: "password" },
};

export const NumberInput: Story = {
    args: { label: "Jumlah", type: "number", min: 0, max: 100, defaultValue: 1 },
};

export const DateInput: Story = {
    args: { label: "Tanggal", type: "date" },
};

export const Disabled: Story = {
    args: { label: "Nama", defaultValue: "Tidak bisa diubah", disabled: true },
};

export const WithError: Story = {
    args: { label: "Email", type: "email", name: "email", defaultValue: "bukan-email", error: "Format email tidak valid" },
};
