"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function Breadcrumbs() {
    const path = usePathname();

    const buildBreadcrumbs = () => {
        const pathParts = path.split("/").filter((part) => part !== "");

        return pathParts.map((part, index) => {
            let label = part;
            let href = `/${pathParts.slice(0, index + 1).join("/")}`;
            if (part === "manage") {
                href = "/manage";
            } else if (part === "users") {
                href = "/manage/users";
            }
            label = label.charAt(0).toUpperCase() + label.slice(1);
            return {
                label,
                href,
            };
        });
    };

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {buildBreadcrumbs().map((item, index) => (
                    <React.Fragment key={item.label}>
                        {index > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
