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

interface Breadcrumb {
    label: string;
    href: string;
}

export function Breadcrumbs() {
    const path = usePathname();

    const buildBreadcrumbs = (path: string) => {
        const pathParts = path.split("/").filter((part) => part !== "");
        let breadcrumbs: Breadcrumb[] = [];

        pathParts.forEach((part, index) => {
            let label = part.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
            let href = `/${pathParts.slice(0, index + 1).join("/")}`;

            if (part === "manage") {
                href = "/manage";
            } else if (part === "users") {
                href = "/manage/users";
            } else if (part === "edit") {
                const idIndex = pathParts.indexOf("edit") + 1;
                if (idIndex < pathParts.length) {
                    href = `/${pathParts.slice(0, idIndex + 1).join("/")}`;
                    label = "Edit";
                }
            }

            breadcrumbs.push({ label, href });
        });

        let editIndex = breadcrumbs.findIndex((crumb) => crumb.label.toLowerCase() === "edit");
        if (editIndex !== -1 && editIndex < breadcrumbs.length - 1) {
            breadcrumbs.splice(editIndex + 1, 1);
        }

        return breadcrumbs;
    };

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {buildBreadcrumbs(path).map((item, index) => (
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
