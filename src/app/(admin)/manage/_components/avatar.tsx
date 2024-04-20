"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface AvatarProps {
    session: Session;
}

export function Avatar({ session }: AvatarProps) {
    const avatarUrl: string = session.user?.image ?? "/avatar-placeholder.svg";

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                        <Image
                            src={avatarUrl}
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{session.user?.name ?? "User"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
