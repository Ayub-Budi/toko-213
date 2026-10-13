"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";

// Dummy: belum terhubung ke backend, hanya menampilkan konfirmasi.
export function NewsletterForm() {
    const [email, setEmail] = useState<string | null>(null);

    if (email) {
        return (
            <p role="status" className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-cream">
                <Icon name="lucide:check" />
                Terima kasih! Kode diskon dikirim ke {email}.
            </p>
        );
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setEmail(String(new FormData(event.currentTarget).get("email")));
            }}
            className="flex w-full flex-col gap-3 sm:flex-row"
        >
            <label htmlFor="newsletter-email" className="sr-only">
                Alamat email
            </label>
            <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@email.com"
                className="h-12 min-w-0 flex-1 rounded-full border border-white/25 bg-white/10 px-5 text-cream placeholder:text-cream/60 focus:border-cream focus:outline-none"
            />
            <button
                type="submit"
                className="h-12 rounded-full bg-cream px-6 font-medium text-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
                Kirim kode diskon
            </button>
        </form>
    );
}
