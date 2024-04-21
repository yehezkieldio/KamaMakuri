import { cardRouter } from "@/server/api/routers/card";
import { rarityRouter } from "@/server/api/routers/rarity";
import { userRouter } from "@/server/api/routers/user";
import { wishRouter } from "@/server/api/routers/wish";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    rarity: rarityRouter,
    user: userRouter,
    card: cardRouter,
    wish: wishRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
