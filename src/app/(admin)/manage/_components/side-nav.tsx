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

export function SideNav() {
    const currentPath = usePathname();
    const isActive = (href: string) => currentPath === href;

    return (
        <div>
            <div></div>
        </div>
    );
}
