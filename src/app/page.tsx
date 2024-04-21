import { Auth } from "@/components/auth";
import { Icons } from "@/components/icons";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
    const session = await getServerAuthSession();

    return (
        <div className="relative overflow-hidden px-8 py-24 lg:py-32">
            <div className="pl-0 lg:pl-16">
                <div className="flex flex-col gap-4">
                    <span className="flex flex-row items-end gap-2">
                        <Icons.logo className="h-12 w-12" />
                        <h1 className="text-5xl font-bold lg:text-6xl">KamaMakuri</h1>
                    </span>
                    <p>The anime trading card game.</p>
                </div>
                <div className="mt-8">
                    <Auth session={session} />
                </div>
            </div>
        </div>
    );
}
