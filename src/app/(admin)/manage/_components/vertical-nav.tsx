"use client";

import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HorizontalNav } from "@/app/(admin)/manage/_components/horizontal-nav";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

const navItems = [
    {
        label: "Dashboard",
        icon: Icons.home,
        href: "/manage",
    },
    {
        label: "Users",
        icon: Icons.users,
        href: "/manage/users",
    },
    {
        label: "Cards",
        icon: Icons.cards,
        href: "/manage/cards",
    },
    {
        label: "Wishes",
        icon: Icons.wishes,
        href: "/manage/wishes",
    },
];

interface VerticalNavProps {
    session: Session;
    children: ReactNode;
}

export function VerticalNav({ session, children }: VerticalNavProps) {
    const currentPath = usePathname();
    const isActive = (href: string) => currentPath === href;

    return (
        <>
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Icons.logo className="h-6 w-6" />
                            <span>KamaMakuri</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                        isActive(item.href) && "bg-muted text-primary"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className={cn(isActive(item.href) && "text-primary")}>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <HorizontalNav navItems={navItems} isActive={isActive} session={session} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
            </div>
        </>
    );
}
