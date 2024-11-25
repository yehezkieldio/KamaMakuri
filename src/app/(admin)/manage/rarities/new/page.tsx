import { RarityForm } from "@/app/(admin)/manage/rarities/new/_rarity-form";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { CircleArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default async function NewRarity() {
    const rarities = await api.rarity.all();

    return (
        <div className="space-y-4">
            <div className="flex items-center pb-2">
                <div>
                    <h1 className="text-xl font-bold lg:text-2xl">Create a new rarity</h1>
                    <p className="text-sm text-muted-foreground">Fill out the form below to create a new rarity.</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Link
                        href="/manage/rarities"
                        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-8 gap-1 px-4")}
                    >
                        <CircleArrowRightIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Go back to rarities</span>
                    </Link>
                </div>
            </div>
            <Separator />
            <div className="pt-8">
                <RarityForm rarities={rarities} />
            </div>
        </div>
    );
}
