export interface Product {
    id: string;
    name: string;
    maker: string;
    category: string;
    /** Harga dalam rupiah. */
    price: number;
    /** Harga sebelum diskon, kalau sedang promo. */
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: "Terlaris" | "Baru" | "Promo";
}

export interface Category {
    name: string;
    count: number;
    image: string;
}

export interface Testimonial {
    name: string;
    city: string;
    quote: string;
    product: string;
}
