"use client";

import * as React from "react";
import { Suspense, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui";
import type { NavChild, NavItem } from "@/types/navigation";

interface SidebarProps {
    items: NavItem[];
    title?: string;
}

const matches = (pathname: string, to: string) =>
    pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));

/** Cari `to` yang paling cocok, supaya di /users/create hanya "Tambah User" yang aktif, bukan juga /users. */
function findActiveTo(items: NavItem[], pathname: string | null) {
    if (pathname === null) return null;
    const links = items.flatMap((item) => (item.childrens ? item.childrens.map((c) => c.to) : [item.to]));
    return links.filter((to) => matches(pathname, to)).sort((a, b) => b.length - a.length)[0] ?? null;
}

const linkClasses = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? "bg-blue-50 font-medium text-blue-700" : "text-slate-700 hover:bg-slate-100"
    }`;

export function Sidebar({ items, title = "My App" }: SidebarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="fixed top-3 left-3 z-30 rounded-lg border border-slate-200 bg-white p-2 text-xl text-slate-700 md:hidden"
                aria-label="Buka menu"
            >
                <Icon name="lucide:menu" />
            </button>

            {mobileOpen && (
                <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
                    <span className="font-semibold text-slate-900">{title}</span>
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="text-xl text-slate-500 md:hidden"
                        aria-label="Tutup menu"
                    >
                        <Icon name="lucide:x" />
                    </button>
                </div>

                <nav
                    className="flex-1 overflow-y-auto p-3"
                    onClick={(e) => {
                        // Di mobile, tutup drawer setelah link diklik.
                        if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
                    }}
                >
                    {/* usePathname bisa suspend di route dinamis (cacheComponents); fallback = menu tanpa highlight. */}
                    <Suspense fallback={<NavList items={items} pathname={null} />}>
                        <ActiveNavList items={items} />
                    </Suspense>
                </nav>
            </aside>
        </>
    );
}

function ActiveNavList({ items }: { items: NavItem[] }) {
    return <NavList items={items} pathname={usePathname()} />;
}

function NavList({ items, pathname }: { items: NavItem[]; pathname: string | null }) {
    const activeTo = findActiveTo(items, pathname);

    return (
        <ul className="flex flex-col gap-1">
            {items.map((item) => (
                <li key={item.name}>
                    {item.childrens ? (
                        <NavGroup item={item} childrens={item.childrens} activeTo={activeTo} />
                    ) : (
                        <NavLink item={item} to={item.to} activeTo={activeTo} />
                    )}
                </li>
            ))}
        </ul>
    );
}

function NavLink({ item, to, activeTo }: { item: NavItem | NavChild; to: string; activeTo: string | null }) {
    const active = to === activeTo;

    return (
        <Link href={to} className={linkClasses(active)} aria-current={active ? "page" : undefined}>
            {item.icon && <Icon name={item.icon} className="text-lg" />}
            {item.name}
        </Link>
    );
}

function NavGroup({ item, childrens, activeTo }: { item: NavItem; childrens: NavChild[]; activeTo: string | null }) {
    const id = useId();
    const hasActiveChild = childrens.some((child) => child.to === activeTo);
    // null = belum diklik user, jadi grup otomatis terbuka kalau ada child yang aktif.
    const [toggled, setToggled] = useState<boolean | null>(null);
    const open = toggled ?? hasActiveChild;

    return (
        <>
            <button
                type="button"
                onClick={() => setToggled(!open)}
                className={`${linkClasses(false)} w-full ${hasActiveChild ? "font-medium text-slate-900" : ""}`}
                aria-expanded={open}
                aria-controls={id}
            >
                {item.icon && <Icon name={item.icon} className="text-lg" />}
                <span className="flex-1 text-left">{item.name}</span>
                <Icon name="lucide:chevron-down" className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <ul id={id} className="mt-1 ml-5 flex flex-col gap-1 border-l border-slate-200 pl-2">
                    {childrens.map((child) => (
                        <li key={child.to}>
                            <NavLink item={child} to={child.to} activeTo={activeTo} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
