"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Icon } from "@/components/ui";

// Keranjang sementara (state di browser saja) supaya tombol "Tambah" di landing page bisa dicoba.
interface CartContextValue {
    items: string[];
    add: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<string[]>([]);
    const add = (productId: string) => setItems((prev) => [...prev, productId]);

    return <CartContext value={{ items, add }}>{children}</CartContext>;
}

function useCart() {
    const cart = useContext(CartContext);
    if (!cart) throw new Error("useCart harus dipakai di dalam <CartProvider>");
    return cart;
}

export function CartButton() {
    const { items } = useCart();

    return (
        <button
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-xl text-ink hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
        >
            <Icon name="lucide:shopping-bag" title={`Keranjang, ${items.length} barang`} />
            {items.length > 0 && (
                <span
                    aria-hidden
                    className="absolute top-1 right-1 flex min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] leading-5 font-semibold text-white tabular-nums"
                >
                    {items.length}
                </span>
            )}
        </button>
    );
}

export function AddToCartButton({ productId, productName }: { productId: string; productName: string }) {
    const { items, add } = useCart();
    const count = items.filter((id) => id === productId).length;

    return (
        <button
            type="button"
            onClick={() => add(productId)}
            aria-label={`Tambah ${productName} ke keranjang`}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
                count > 0 ? "bg-moss text-white hover:bg-moss/90" : "bg-ink text-cream hover:bg-clay"
            }`}
        >
            <Icon name={count > 0 ? "lucide:check" : "lucide:plus"} />
            {count > 0 ? `${count} di keranjang` : "Tambah"}
        </button>
    );
}
