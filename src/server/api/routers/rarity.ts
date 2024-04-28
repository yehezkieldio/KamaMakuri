import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { rarities, raritiesEnum } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const rarityRouter = createTRPCRouter({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.rarities.findMany();
    }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.enum(raritiesEnum),
                probability: z.string(),
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
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rarities).where(eq(rarities.id, input.id));
        }),
});
