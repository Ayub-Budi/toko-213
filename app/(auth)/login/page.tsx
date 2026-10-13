"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { getErrorMessage } from "@/lib/api";
import { login } from "@/services/auth.service";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setLoading(true);
        setError(null);
        try {
            await login({
                username: String(form.get("username")),
                password: String(form.get("password")),
            });
            router.replace("/dashboard");
            router.refresh();
        } catch (err) {
            setError(getErrorMessage(err));
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Login</h1>
                    <p className="text-sm text-slate-500">Masuk untuk melanjutkan ke dashboard.</p>
                </div>

                <Input label="Username" name="username" autoComplete="username" required />
                <Input label="Password" name="password" type="password" autoComplete="current-password" required />

                {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

                <Button type="submit" label={loading ? "Memproses..." : "Login"} disabled={loading} />

                <p className="text-xs text-slate-400">
                    Demo (dummyjson.com): <code>emilys</code> / <code>emilyspass</code>
                </p>
            </form>
        </main>
    );
}
