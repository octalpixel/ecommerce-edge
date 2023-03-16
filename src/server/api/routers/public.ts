import { listProducts } from "~/server/services/products";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const publicRouter = createTRPCRouter({
    listProducts: publicProcedure.query(async ({ ctx }) => {
        const { db } = ctx;
        console.log("listProducts");

        return await listProducts(db);
    }),
});
