import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { env } from "~/env.mjs"
import { s3Client } from "~/server/s3"
import { getAuth } from "@clerk/nextjs/server"
import { db } from "~/server/db"
import { ulidFactory } from "ulid-workers"
import type { NextApiRequest, NextApiResponse } from "next"

const ulid = ulidFactory()

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405)
        return res.json({ error: "METHOD_NOT_ALLOWED" })
    }

    const { userId } = getAuth(req)

    if (!userId) {
        res.status(401)
        return res.json({ error: "UNAUTHORIZED" })
    }

    const isUserAdmin = Boolean(
        await db
            .selectFrom("AdminUsers")
            .select("id")
            .where("AdminUsers.id", "=", userId)
            .executeTakeFirst()
    )

    if (!isUserAdmin) {
        res.status(401)
        return res.json({ error: "UNAUTHORIZED" })
    }

    const imageId = ulid()

    const key = `${userId}/${imageId}`

    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: env.BUCKET_NAME,
        Key: key,
        Conditions: [
            // content type must be an image
            ["starts-with", "$Content-Type", "image/"],
            // content length must be less than 5MB
            ["content-length-range", 0, 5 * 1024 * 1024],
        ],
        // 1 minute
        Expires: 60,
    })

    if (!url || !fields) {
        res.status(500)
        return res.json({ error: "Could not generate presigned post" })
    }

    await db
        .insertInto("Image")
        .values({
            id: imageId,
            url: `${url}${key}`,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .execute()

    res.status(200)
    return res.json({ url, fields })
}

export const config = {
    runtime: "nodejs",
}
