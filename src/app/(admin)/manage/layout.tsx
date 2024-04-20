import { Breadcrumbs } from "@/app/(admin)/manage/_components/breadcrumbs";
import { SideNav } from "@/app/(admin)/manage/_components/side-nav";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();
    if (!session?.user) return redirect("/api/auth/signin/discord");

    const me = await api.user.me();
    const role = me?.role;

    if (role !== "admin") {
        return redirect("/");
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <SideNav />
            <div className="flex flex-col sm:gap-4 sm:py-6 sm:pl-16">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumbs />
                    {children}
                </header>
            </div>
        </div>
    );
}
