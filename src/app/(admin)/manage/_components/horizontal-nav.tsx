import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/app/(admin)/manage/_components/breadcrumbs";
import { Avatar } from "@/app/(admin)/manage/_components/avatar";
import type { Session } from "next-auth";

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface HorizontalNavProps {
    navItems: {
        label: string;
        icon: LucideIcon;
        href: string;
    }[];
    isActive: (href: string) => boolean;
    session: Session;
}

export function HorizontalNav({ navItems, isActive, session }: HorizontalNavProps) {
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
                            {navItems.map((item) => (
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
                            ))}
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
