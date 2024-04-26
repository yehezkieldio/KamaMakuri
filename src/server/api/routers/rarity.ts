import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { rarities, raritiesEnum } from "@/server/db/schema";
import { z } from "zod";

export const rarityRouter = createTRPCRouter({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.rarities.findMany();
    }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.enum(raritiesEnum),
                probability: z.number().min(0).max(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const rarityName = input.name;

            await ctx.db.insert(rarities).values({
                id: crypto.randomUUID(),
                name: rarityName,
                probability: input.probability,
            });
        }),
});
