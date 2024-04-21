import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const cardRouter = createTRPCRouter({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.cards.findMany();
    }),
});
