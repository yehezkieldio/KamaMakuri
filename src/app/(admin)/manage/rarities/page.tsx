import { rarityColumns } from "@/app/(admin)/manage/rarities/_components/rarity-column";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { PlusCircleIcon } from "lucide-react";

export default async function ManageRarities() {
    const rarities = await api.rarity.all();

    return (
        <div className="space-y-4">
            <div className="flex items-center pb-2">
                <div>
                    <h1 className="text-2xl font-bold">Rarities</h1>
                    <p className="text-sm text-muted-foreground">Manage the rarities of your cards.</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircleIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Rarity</span>
                    </Button>
                </div>
            </div>
            <Separator />
            <div className="pt-8">
                <DataTable columns={rarityColumns} data={rarities} />
            </div>
        </div>
    );
}
