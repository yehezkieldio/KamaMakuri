import { Avatar } from "@/app/(admin)/manage/_components/avatar";
import { Breadcrumbs } from "@/app/(admin)/manage/_components/breadcrumbs";
import { SideNav } from "@/app/(admin)/manage/_components/side-nav";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();
    if (!session?.user) return redirect("/api/auth/signin/discord");

    if (session?.user.role !== "admin") {
        return redirect("/");
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <SideNav />
            <div className="flex flex-col sm:gap-4 sm:pl-16 sm:pt-2">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 py-2 sm:static sm:h-auto sm:bg-transparent">
                    <Breadcrumbs />
                    <Avatar session={session} />
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
            </div>
        </div>
    );
}
