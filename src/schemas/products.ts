import { z } from "zod";
import { type Database } from "~/server/db";
import { implement } from "~/utils/zod-implements";

export type Product = Omit<
    Database["Product"],
    "id" | "createdAt" | "updatedAt" | "seoId"
>;

export const productCreationSchema = implement<Product>().with({
    name: z.string().min(1).max(191),
    description: z.string().min(1).max(2000),
    price: z.number().positive(),
    active: z.boolean(),
    inStock: z.number().min(0).nullable(),
    sku: z.string().min(1).max(191).nullable(),
});

export const productUpdateSchema = implement<Product & { id: string }>().with({
    id: z.string().min(1).max(191),
    name: z.string().min(1).max(191),
    description: z.string().min(1).max(2000),
    price: z.number().positive(),
    active: z.boolean(),
    inStock: z.number().min(0).nullable(),
    sku: z.string().min(1).max(191).nullable(),
});
