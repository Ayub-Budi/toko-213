import type { IconName } from "@/components/ui";

export interface NavChild {
    name: string;
    icon?: IconName;
    to: string;
}

/** Item menu: pakai `to` untuk link langsung, atau `childrens` untuk grup yang bisa dibuka-tutup. */
export type NavItem =
    | { name: string; icon?: IconName; to: string; childrens?: never }
    | { name: string; icon?: IconName; to?: never; childrens: NavChild[] };
