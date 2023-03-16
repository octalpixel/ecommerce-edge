import { type Kysely } from "kysely"
import { type Database } from "../db"

export async function isUserAdmin(
    db: Kysely<Database>,
    userId: string
): Promise<boolean> {
    const user = await db
        .selectFrom("AdminUsers")
        .where("id", "=", userId)
        .select("id")
        .executeTakeFirst()
    return Boolean(user)
}
