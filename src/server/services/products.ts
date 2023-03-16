import { type Kysely } from "kysely"
import { type Database } from "../db"
import { type Product } from "@prisma/client/edge"

export async function listProducts(db: Kysely<Database>): Promise<Product[]> {
    return await db.selectFrom("Product").selectAll().execute()
}
