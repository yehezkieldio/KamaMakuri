import { Icons } from "@/components/icons";

export function Nav() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-muted/40 px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <a href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Icons.logo className="h-6 w-6" />
                </a>
                <a
                    href="/dashboard"
                    className="rounded-md bg-muted p-1 px-2 text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </a>
            </nav>
        </header>
    );
}
