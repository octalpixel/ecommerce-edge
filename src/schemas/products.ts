import { z } from "zod"
import { type Database } from "~/server/db"
import { implement } from "~/utils/zod-implements"

export type Product = Omit<
    Database["Product"],
    "id" | "createdAt" | "updatedAt" | "seoId"
>

export const productCreationSchema = implement<Product>().with({
    name: z.string().min(1).max(191),
    //@ts-expect-error undefined works aswell
    description: z.string().max(2000).nullish(),
    //@ts-expect-error zod-implements does not support custom transforms
    price: z
        .string()
        .transform((s) => parseFloat(s.replace(/,/g, ".")))
        .or(z.number()),
    active: z.boolean(),
    inStock: z.number().min(0).nullable(),
    sku: z.string().max(191).nullable(),
})

export const productUpdateSchema = implement<Product & { id: string }>().with({
    id: z.string().min(1).max(191),
    name: z.string().min(1).max(191),
    //@ts-expect-error undefined works aswell
    description: z.string().max(2000).nullish(),
    //@ts-expect-error zod-implements does not support custom transforms
    price: z
        .string()
        .transform((s) => parseFloat(s.replace(/,/g, ".")))
        .or(z.number()),
    active: z.boolean(),
    inStock: z.number().min(0).nullable(),
    sku: z.string().max(191).nullable(),
})
