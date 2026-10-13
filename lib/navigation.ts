import type { NavItem } from "@/types/navigation";

export const sidebarItems: NavItem[] = [
    {
        name: "Dashboard",
        icon: "lucide:layout-dashboard",
        to: "/dashboard",
    },
    {
        name: "Users",
        icon: "lucide:users",
        childrens: [
            { name: "Daftar User", icon: "lucide:list", to: "/users" },
            { name: "Tambah User", icon: "lucide:user-plus", to: "/users/create" },
        ],
    },
    {
        name: "Settings",
        icon: "lucide:settings",
        to: "/settings",
    },
];
