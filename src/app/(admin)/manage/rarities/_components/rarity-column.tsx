"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { RarityActionsColumn } from "@/app/(admin)/manage/rarities/_components/actions-column";

export type Rarity = {
    id: string;
    name: string | null;
    probability: string | null;
};

export const rarityColumns: ColumnDef<Rarity>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "probability",
        header: "Probability",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const rarity = row.original;

            return <RarityActionsColumn rarity={rarity} />;
        },
    },
];
