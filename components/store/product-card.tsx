import Image from "next/image";
import { Icon } from "@/components/ui";
import { formatRupiah } from "@/lib/store-data";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./cart";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
    Terlaris: "bg-ink text-cream",
    Baru: "bg-moss text-white",
    Promo: "bg-clay text-white",
};

export function ProductCard({ product }: { product: Product }) {
    return (
        <article className="group flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {product.badge && (
                    <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[product.badge]}`}>
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 pt-4">
                <p className="text-xs tracking-wide text-muted uppercase">{product.maker}</p>
                <h3 className="font-display text-lg leading-snug text-ink">{product.name}</h3>
                <p className="flex items-center gap-1 text-sm text-muted">
                    <Icon name="lucide:star" className="fill-current text-clay" />
                    <span className="font-medium text-ink">{product.rating.toLocaleString("id-ID")}</span>
                    <span>({product.reviews} ulasan)</span>
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                    <p className="flex flex-col">
                        {product.originalPrice && (
                            <s className="text-xs text-muted">{formatRupiah(product.originalPrice)}</s>
                        )}
                        <span className="font-semibold text-ink tabular-nums">{formatRupiah(product.price)}</span>
                    </p>
                    <AddToCartButton productId={product.id} productName={product.name} />
                </div>
            </div>
        </article>
    );
}
