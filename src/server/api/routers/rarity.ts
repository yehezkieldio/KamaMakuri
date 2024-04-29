import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { rarities, raritiesEnum } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const rarityRouter = createTRPCRouter({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.rarities.findMany();
    }),
    one: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            return ctx.db.query.rarities.findFirst({ where: eq(rarities.id, input.id) });
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
    edit: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                probability: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(rarities)
                .set({
                    probability: input.probability,
                })
                .where(eq(rarities.id, input.id));
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
