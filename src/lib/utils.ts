import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { rarities, raritiesEnum } from "@/server/db/schema";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRemainingRarities(rarityList: (typeof rarities.$inferSelect)[]) {
    const rarityNames = rarityList.map((rarity) => rarity.name);
    return raritiesEnum.filter((rarity) => !rarityNames.includes(rarity));
}
