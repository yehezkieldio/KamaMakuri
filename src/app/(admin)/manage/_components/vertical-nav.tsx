"use client";

import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HorizontalNav } from "@/app/(admin)/manage/_components/horizontal-nav";
import type { Session } from "next-auth";
import type { ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
                        <nav className="grid items-start space-y-2 px-2 text-sm font-medium lg:px-4">
                            {/* TODO: Eventually move this into it's own variable then map it.*/}
                            <Link
                                href="/manage"
                                className={cn(
                                    "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                    isActive("/manage") && "bg-muted/60 text-primary"
                                )}
                            >
                                <Icons.dashboard className="h-4 w-4" />
                                <span className={cn(isActive("/manage") && "text-primary")}>Dashboard</span>
                            </Link>
                            <Link
                                href="/manage/users"
                                className={cn(
                                    "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                    isActive("/manage/users") && "bg-muted/60 text-primary"
                                )}
                            >
                                <Icons.users className="h-4 w-4" />
                                <span className={cn(isActive("/manage/users") && "text-primary")}>User</span>
                            </Link>
                            <Link
                                href="/manage/rarities"
                                className={cn(
                                    "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                    isActive("/manage/rarities") && "bg-muted/60 text-primary"
                                )}
                            >
                                <Icons.rarities className="h-4 w-4" />
                                <span className={cn(isActive("/manage/rarities") && "text-primary")}>Rarity</span>
                            </Link>
                            <Collapsible>
                                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 px-3 text-sm font-medium text-gray-700 text-muted-foreground hover:bg-muted hover:text-primary">
                                    <div className="flex items-center gap-3">
                                        <Icons.cards className="h-4 w-4" />
                                        Card
                                    </div>
                                    <Icons.arrow_down className="h-4 w-4 transition-transform" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="space-y-1 pl-6">
                                    <Link
                                        href="/manage/cards"
                                        className={cn(
                                            "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                            isActive("/manage/cards") && "bg-muted/60 text-primary"
                                        )}
                                    >
                                        <span className={cn(isActive("/manage/cards") && "text-primary")}>Card</span>
                                    </Link>
                                    <Link
                                        href="/manage/cards/series"
                                        className={cn(
                                            "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                            isActive("/manage/cards/series") && "bg-muted/60 text-primary"
                                        )}
                                    >
                                        <span className={cn(isActive("/manage/cards/series") && "text-primary")}>
                                            Card Series
                                        </span>
                                    </Link>
                                    <Link
                                        href="/manage/cards/rarity-card"
                                        className={cn(
                                            "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                            isActive("/manage/cards/rarity-card") && "bg-muted/60 text-primary"
                                        )}
                                    >
                                        <span className={cn(isActive("/manage/cards/rarity-card") && "text-primary")}>
                                            Rarity Card
                                        </span>
                                    </Link>
                                </CollapsibleContent>
                            </Collapsible>
                            <Link
                                href="/manage/wishes"
                                className={cn(
                                    "mt-1 flex items-center gap-3 rounded-lg p-2 px-3 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                                    isActive("/manage/wishes") && "bg-muted/60 text-primary"
                                )}
                            >
                                <Icons.wishes className="h-4 w-4" />
                                <span className={cn(isActive("/manage/wishes") && "text-primary")}>Wish</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <HorizontalNav session={session} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
            </div>
        </>
    );
}
