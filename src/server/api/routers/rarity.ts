import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const rarityRouter = createTRPCRouter({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.rarities.findMany();
    }),
});
