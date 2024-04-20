import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();
    if (!session?.user) return redirect("/api/auth/signin/discord");

    const me = await api.user.me();
    const role = me?.role;

    if (role !== "admin") {
        return redirect("/");
    }

    return <>{children}</>;
}
