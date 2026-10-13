// Data dummy untuk landing page toko. Ganti dengan data dari API kalau backend sudah siap.
import type { Category, Product, Testimonial } from "@/types/product";

const unsplash = (id: string, width = 800) =>
    `https://images.unsplash.com/photo-${id}?w=${width}&q=75&auto=format&fit=crop`;

export const store = {
    name: "Rumah Lokal",
    tagline: "Perabot buatan tangan perajin Indonesia",
    address: "Jl. Kemang Raya No. 18, Jakarta Selatan",
    email: "halo@rumahlokal.id",
    heroImage: unsplash("1556228453-efd6c1ff04f6", 1400),
    storyImage: unsplash("1612196808214-b8e1d6145a8c", 1000),
};

export const stats = [
    { value: "120+", label: "perajin dari 14 kota" },
    { value: "18 rb", label: "pesanan terkirim" },
    { value: "4,9", label: "rating rata-rata" },
];

export const categories: Category[] = [
    { name: "Keramik", count: 42, image: unsplash("1610701596007-11502861dcfa", 600) },
    { name: "Tekstil", count: 28, image: unsplash("1594040226829-7f251ab46d80", 600) },
    { name: "Dekorasi", count: 35, image: unsplash("1565193566173-7a0ee3dbe261", 600) },
    { name: "Dapur & Kopi", count: 19, image: unsplash("1559056199-641a0ac8b55e", 600) },
];

export const products: Product[] = [
    {
        id: "gelas-tanah-liat",
        name: "Set Gelas Tanah Liat (4 pcs)",
        maker: "Studio Kasongan, Bantul",
        category: "Keramik",
        price: 285000,
        rating: 4.9,
        reviews: 312,
        image: unsplash("1610701596007-11502861dcfa"),
        badge: "Terlaris",
    },
    {
        id: "piring-stoneware",
        name: "Piring Stoneware Biru Laut",
        maker: "Tanah Air Ceramics, Bali",
        category: "Keramik",
        price: 165000,
        originalPrice: 210000,
        rating: 4.8,
        reviews: 187,
        image: unsplash("1578749556568-bc2c40e68b61"),
        badge: "Promo",
    },
    {
        id: "vas-gerabah",
        name: "Vas Gerabah Putih Gading",
        maker: "Plered Craft, Purwakarta",
        category: "Dekorasi",
        price: 340000,
        rating: 4.9,
        reviews: 96,
        image: unsplash("1612196808214-b8e1d6145a8c"),
    },
    {
        id: "lilin-sereh",
        name: "Lilin Aromaterapi Sereh Wangi",
        maker: "Rumah Lilin, Bandung",
        category: "Dekorasi",
        price: 120000,
        rating: 4.7,
        reviews: 254,
        image: unsplash("1603006905003-be475563bc59"),
        badge: "Baru",
    },
    {
        id: "karpet-tenun",
        name: "Karpet Tenun Ikat Sumba",
        maker: "Kain Timur, Waingapu",
        category: "Tekstil",
        price: 1250000,
        rating: 5,
        reviews: 41,
        image: unsplash("1594040226829-7f251ab46d80"),
    },
    {
        id: "trio-vas",
        name: "Trio Botol Vas Matte",
        maker: "Studio Kasongan, Bantul",
        category: "Dekorasi",
        price: 275000,
        originalPrice: 320000,
        rating: 4.6,
        reviews: 73,
        image: unsplash("1565193566173-7a0ee3dbe261"),
        badge: "Promo",
    },
    {
        id: "pot-tosca",
        name: "Pot Keramik Tosca + Tanaman",
        maker: "Hijau Kecil, Malang",
        category: "Keramik",
        price: 95000,
        rating: 4.8,
        reviews: 408,
        image: unsplash("1485955900006-10f4d324d411"),
    },
    {
        id: "kopi-gayo",
        name: "Kopi Arabika Gayo 250 g",
        maker: "Kebun Takengon, Aceh",
        category: "Dapur & Kopi",
        price: 89000,
        rating: 4.9,
        reviews: 521,
        image: unsplash("1559056199-641a0ac8b55e"),
        badge: "Terlaris",
    },
];

export const perks = [
    {
        icon: "lucide:truck",
        title: "Gratis ongkir",
        description: "Untuk belanja di atas Rp500.000 ke seluruh Jawa dan Bali.",
    },
    {
        icon: "lucide:shield-check",
        title: "Dibungkus aman",
        description: "Barang pecah belah dikemas berlapis. Pecah di jalan, kami ganti.",
    },
    {
        icon: "lucide:refresh-ccw",
        title: "Retur 14 hari",
        description: "Tidak cocok di rumah? Kembalikan tanpa banyak pertanyaan.",
    },
] as const;

export const testimonials: Testimonial[] = [
    {
        name: "Dinda Pratiwi",
        city: "Yogyakarta",
        quote: "Gelasnya lebih bagus dari fotonya. Tiap gelas warnanya sedikit beda, malah jadi terasa buatan tangan beneran.",
        product: "Set Gelas Tanah Liat",
    },
    {
        name: "Raka Mahendra",
        city: "Surabaya",
        quote: "Karpet tenunnya sampai dalam 3 hari, dibungkus rapi dan ada kartu cerita dari penenunnya. Sekarang jadi pusat ruang tamu.",
        product: "Karpet Tenun Ikat Sumba",
    },
    {
        name: "Sari Wulandari",
        city: "Depok",
        quote: "Sudah langganan kopi Gayo-nya tiap bulan. Wangi lilin serehnya juga awet, satu lilin bisa dipakai sebulan lebih.",
        product: "Kopi Arabika Gayo",
    },
];

export const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
