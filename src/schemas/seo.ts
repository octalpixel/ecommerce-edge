import { z } from "zod"
import { type Database } from "~/server/db"
import { implement } from "~/utils/zod-implements"

type SEO = Omit<Database["SEO"], "id" | "createdAt" | "updatedAt">

export const seoCreationSchema = implement<SEO>().with({
    title: z.string().min(1).max(191),
    description: z.string().min(1).max(2000),
    customPermalink: z.string().min(1).max(191),
})

export const seoUpdateSchema = implement<SEO & { id: string }>().with({
    id: z.string().min(1).max(191),
    title: z.string().min(1).max(191),
    description: z.string().min(1).max(2000),
    customPermalink: z.string().min(1).max(191),
})
