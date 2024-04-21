"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/app/(admin)/manage/_components/breadcrumbs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { Avatar } from "@/app/(admin)/manage/_components/avatar";
import type { Session } from "next-auth";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";

interface HorizontalNavProps {
    session: Session;
}

export function HorizontalNav({ session }: HorizontalNavProps) {
    const currentPath = usePathname();
    const isActive = (href: string) => currentPath === href;

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <>
                            <Link href="#" className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                <span className="sr-only">KamaMakuri</span>
                            </Link>
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
                                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 px-3 font-medium text-gray-700 text-muted-foreground hover:bg-muted hover:text-primary">
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
                            {/* {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                        isActive(item.href) && "bg-muted text-primary"
                                    )}
                                >
                                    <item.icon className="h-6 w-6" />
                                    <span className={cn(isActive(item.href) && "text-primary")}>{item.label}</span>
                                </Link>
                            ))} */}
                        </>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <Breadcrumbs />
            </div>
            <Avatar session={session} />
        </header>
    );
}
