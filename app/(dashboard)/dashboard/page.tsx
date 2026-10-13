"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Icon } from "@/components/ui";
import { getErrorMessage } from "@/lib/api";
import { getMe, logout } from "@/services/auth.service";
import { getUsers } from "@/services/user.service";
import type { Paginated, User } from "@/types/user";

export default function DashboardPage() {
    const router = useRouter();
    const [me, setMe] = useState<User | null>(null);
    const [users, setUsers] = useState<Paginated<User> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([getMe(), getUsers({ limit: 5 })])
            .then(([me, users]) => {
                setMe(me);
                setUsers(users);
            })
            .catch((err) => setError(getErrorMessage(err)));
    }, []);

    function handleLogout() {
        logout();
        router.replace("/login");
        router.refresh();
    }

    return (
        <main className="flex flex-col gap-6 p-6 pt-16 md:pt-6">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
                    <p className="text-sm text-slate-500">
                        {me ? `Halo, ${me.firstName} ${me.lastName}` : "Memuat..."}
                    </p>
                </div>
                <Button label="Logout" variant="outline" size="small" onClick={handleLogout} />
            </header>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <section className="grid gap-4 sm:grid-cols-3">
                <StatCard icon="lucide:users" label="Total User" value={users?.total} />
                <StatCard icon="lucide:list" label="Ditampilkan" value={users?.items.length} />
                <StatCard icon="lucide:layout-dashboard" label="Login sebagai" value={me?.username} />
            </section>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <h2 className="border-b border-slate-200 px-4 py-3 font-medium text-slate-900">User Terbaru</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-4 py-2 font-medium">Nama</th>
                                <th className="px-4 py-2 font-medium">Username</th>
                                <th className="px-4 py-2 font-medium">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {users?.items.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                </tr>
                            )) ?? (
                                <tr>
                                    <td colSpan={3} className="px-4 py-6 text-center text-slate-400">Memuat...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

function StatCard({ icon, label, value }: { icon: React.ComponentProps<typeof Icon>["name"]; label: string; value?: string | number }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="rounded-lg bg-blue-50 p-3 text-xl text-blue-700">
                <Icon name={icon} />
            </div>
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xl font-semibold text-slate-900">{value ?? "–"}</p>
            </div>
        </div>
    );
}
