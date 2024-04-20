import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
    me: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.users.findFirst({
            where: eq(users.id, ctx.session.user.id),
            with: {
                economies: true,
                progressions: true,
                decks: true,
                wishHistories: true,
                cards: true,
            },
        });
    }),
});
