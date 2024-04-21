import { VerticalNav } from "@/app/(admin)/manage/_components/vertical-nav";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();
    if (!session?.user) return redirect("/api/auth/signin/discord");

    if (session?.user.role !== "admin") {
        return redirect("/");
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <VerticalNav session={session}>{children}</VerticalNav>
        </div>
    );
}
