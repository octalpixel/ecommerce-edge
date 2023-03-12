import { z } from "zod";
import { productCreationSchema } from "~/schemas/products";
import { seoCreationSchema } from "~/schemas/seo";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ulidFactory } from "ulid-workers";

const ulid = ulidFactory();

export const productsRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        const { db } = ctx;
        const products = await db.selectFrom("Product").selectAll().execute();
        return products;
    }),

    create: adminProcedure
        .input(
            z.object({
                product: productCreationSchema,
                seo: seoCreationSchema.optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { db } = ctx;
            const { seo, product } = input;

            if (!seo) {
                const insertedProduct = await db
                    .insertInto("Product")
                    .values({
                        id: ulid(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        ...product,
                    })
                    .executeTakeFirst();
                return insertedProduct;
            }

            const SEO_ID = ulid();

            await db
                .insertInto("SEO")
                .values({
                    id: SEO_ID,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ...seo,
                })
                .executeTakeFirstOrThrow();

            const insertedProduct = await db
                .insertInto("Product")
                .values({
                    id: ulid(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    seoId: SEO_ID,
                    ...product,
                })
                .executeTakeFirst();

            return insertedProduct;
        }),
});
