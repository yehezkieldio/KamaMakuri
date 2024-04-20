import { Nav } from "@/app/(main)/dashboard/_components/nav";
import { getServerAuthSession } from "@/server/auth";

export default async function Dashboard() {
    const session = await getServerAuthSession();
    const user = session?.user;

    return (
        <>
            <Nav />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <p className="leading-7">
                        Welcome to your dashboard, <span className="font-semibold">{user?.name}</span>!
                    </p>
                    <p className="leading-7 text-foreground">
                        Currently, there is not much to see here. Come back later for more features!
                    </p>
                </div>
            </main>
        </>
    );
}
