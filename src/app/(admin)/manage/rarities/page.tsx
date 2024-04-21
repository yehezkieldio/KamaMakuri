import { rarityColumns } from "@/app/(admin)/manage/rarities/_components/rarity-column";
import { DataTable } from "@/components/data-table";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { PlusCircleIcon } from "lucide-react";

export default async function ManageRarities() {
    const rarities = await api.rarity.all();

    return (
        <div className="space-y-4">
            <div className="flex items-center pb-2">
                <div>
                    <h1 className="text-xl font-bold lg:text-2xl">Rarities</h1>
                    <p className="text-sm text-muted-foreground">Manage the rarities of your cards.</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <a
                        href="/manage/rarities/new"
                        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-8 gap-1 px-4")}
                    >
                        <PlusCircleIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Rarity</span>
                    </a>
                </div>
            </div>
            <Separator />
            <div className="pt-8">
                <DataTable columns={rarityColumns} data={rarities} />
            </div>
        </div>
    );
}
