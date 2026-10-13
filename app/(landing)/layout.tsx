import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
    variable: "--font-fraunces",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Rumah Lokal — Perabot buatan tangan perajin Indonesia",
    description: "Keramik, tenun, dekorasi, dan kopi dari 120+ perajin lokal. Gratis ongkir Jawa–Bali.",
};

export default function LandingLayout({ children }: LayoutProps<"/">) {
    return <div className={`${fraunces.variable} w-full`}>{children}</div>;
}
