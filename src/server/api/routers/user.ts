import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
    me: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.users.findFirst({
            where: eq(users.id, ctx.session.user.id),
        });
    }),
    all: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.users.findMany({
            columns: {
                id: true,
                uid: true,
                name: true,
                role: true,
            },
        });
    }),
});
