"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface AuthProps {
    session: Session | null;
}

export function Auth({ session }: AuthProps) {
    return (
        <>
            {session ? (
                <>
                    <div className="flex flex-row gap-2">
                        <a href="/dashboard" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4")}>
                            Dashboard
                        </a>
                        <Button
                            onClick={() => signOut()}
                            className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4")}
                        >
                            <Icons.logout className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </>
            ) : (
                <Button
                    onClick={() => signIn("discord")}
                    className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4")}
                >
                    <Icons.discord className="mr-2 h-4 w-4" />
                    Login with Discord
                </Button>
            )}
        </>
    );
}
