import { Sidebar } from "@/components/layout";
import { sidebarItems } from "@/lib/navigation";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar items={sidebarItems} />
            <div className="flex min-w-0 flex-1 flex-col bg-slate-50">{children}</div>
        </div>
    );
}
