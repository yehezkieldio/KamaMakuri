import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const wishRouter = createTRPCRouter({
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.wishes.findMany();
    }),
});
