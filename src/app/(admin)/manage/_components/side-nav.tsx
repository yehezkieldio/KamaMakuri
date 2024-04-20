"use client";

import { Icons } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
];

export function SideNav() {
    const currentPath = usePathname();
    const isActive = (href: string) => currentPath === href;

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-muted/40 sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/"
                    className="group mb-4 flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Icons.logo className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Kama</span>
                </Link>
                {navItems.map((item) => (
                    <TooltipProvider key={item.label}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                                        isActive(item.href)
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </nav>
        </aside>
    );
}
