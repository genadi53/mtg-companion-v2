import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { setRouter } from "./routers/sets";
import { cardsRouter } from "./routers/cards";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  set: setRouter,
  card: cardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
