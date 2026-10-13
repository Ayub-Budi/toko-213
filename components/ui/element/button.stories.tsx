import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./button";

const meta = {
    title: "Element/Button",
    component: Button,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`tsx
import { Button } from "@/components/ui";

<Button label="Simpan" />
<Button label="Batal" variant="outline" size="small" onClick={() => {}} />
\`\`\`
`,
            },
        },
    },
    args: {
        label: "Button",
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: "inline-radio",
            options: ["solid", "outline"],
            description: "Gaya tampilan tombol",
        },
        size: {
            control: "inline-radio",
            options: ["small", "medium", "large"],
            description: "Ukuran tombol",
        },
        label: { description: "Teks di dalam tombol" },
        disabled: { control: "boolean" },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
    args: { variant: "solid" },
};

export const Outline: Story = {
    args: { variant: "outline" },
};

export const Sizes: Story = {
    render: (args) => (
        <div className="flex items-center gap-3">
            <Button {...args} size="small" label="Small" />
            <Button {...args} size="medium" label="Medium" />
            <Button {...args} size="large" label="Large" />
        </div>
    ),
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const Submit: Story = {
    args: { type: "submit", label: "Simpan" },
};
