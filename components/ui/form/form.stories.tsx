import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { z } from "zod";
import { Button } from "../element/button";
import { Form } from "./form";
import { Input } from "./input";

const loginSchema = z.object({
    email: z.email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

const meta = {
    title: "Form/Form",
    component: Form,
    parameters: {
        docs: {
            description: {
                component: `
Validasi isi form dengan schema Zod. Kalau lolos, \`onSubmit(data, form)\` dipanggil dengan data hasil parse.
Kalau gagal, error otomatis tampil di bawah \`<Input>\` yang \`name\`-nya cocok, dan \`onError\` (opsional)
dipanggil dengan array \`[{ name, message }]\`. Error sebuah field hilang begitu field itu diketik ulang.

\`\`\`tsx
import { z } from "zod";
import { Button, Form, Input } from "@/components/ui";

const schema = z.object({
    email: z.email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

<Form schema={schema} onSubmit={(data) => login(data)} onError={(errors) => console.log(errors)}>
    <Input label="Email" name="email" type="email" />
    <Input label="Password" name="password" type="password" />
    <Button label="Masuk" type="submit" />
</Form>
\`\`\`
`,
            },
        },
    },
    args: {
        schema: loginSchema,
        onSubmit: fn(),
        onError: fn(),
    },
    decorators: [
        (Story) => (
            <div className="max-w-sm">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Form<typeof loginSchema>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Klik "Masuk" tanpa mengisi apa pun untuk melihat error di bawah tiap input. */
export const Default: Story = {
    render: (args) => (
        <Form {...args} className="flex flex-col gap-4">
            <Input label="Email" name="email" type="email" placeholder="nama@email.com" />
            <Input label="Password" name="password" type="password" />
            <Button label="Masuk" type="submit" />
        </Form>
    ),
};
