import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CircleArrowRightIcon } from "lucide-react";

export default async function NewRarity() {
    return (
        <div className="space-y-4">
            <div className="flex items-center pb-2">
                <div>
                    <h1 className="text-2xl font-bold">Create a new rarity</h1>
                    <p className="text-sm text-muted-foreground">Fill out the form below to create a new rarity.</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <a
                        href="/manage/rarities"
                        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-8 gap-1 px-4")}
                    >
                        <CircleArrowRightIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Go back to rarities</span>
                    </a>
                </div>
            </div>
            <Separator />
            <div className="pt-8">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    );
}
