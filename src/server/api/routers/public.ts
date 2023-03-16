import { listProducts } from "~/server/services/products"
import { createTRPCRouter, publicProcedure } from "../trpc"

const waitFor = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

export const publicRouter = createTRPCRouter({
    listProducts: publicProcedure.query(async ({ ctx }) => {
        const { db } = ctx
        console.log("listProducts")

        return await listProducts(db)
    }),
    slowQueryCached: publicProcedure.query(async () => {
        await waitFor(5000) // wait for 5s
        return {
            lastUpdated: new Date().toJSON(),
        }
    }),
})
