"server-only";

import { HorizontalNav } from "@/app/(admin)/manage/_components/horizontal-nav";
import { VerticalNav } from "@/app/(admin)/manage/_components/vertical-nav";
import { getServerAuthSession } from "@/server/auth";
import type { ReactNode } from "react";

interface InitialProps {
    children: ReactNode;
}

export async function Initial({ children }: InitialProps) {
    const session = await getServerAuthSession();

    return (
        <>
            <VerticalNav />
            <div className="flex flex-col">
                <HorizontalNav session={session} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
            </div>
        </>
    );
}
