import { rarityColumns } from "@/app/(admin)/manage/rarities/_components/rarity-column";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { PlusCircleIcon } from "lucide-react";

export default async function ManageRarities() {
    const rarities = await api.rarity.all();

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircleIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Rarity</span>
                    </Button>
                </div>
            </div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle>Rarities</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={rarityColumns} data={rarities} />
                </CardContent>
            </Card>
        </div>
    );
}
