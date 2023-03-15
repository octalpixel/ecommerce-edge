import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { s3Client } from "~/server/s3";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { ulidFactory } from "ulid-workers";

const ulid = ulidFactory();

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);

    if (!userId) {
        return new NextResponse(JSON.stringify({ error: "UNAUTHORIZED" }), {
            status: 401,
        });
    }

    const isUserAdmin = Boolean(
        await db
            .selectFrom("AdminUsers")
            .select("id")
            .where("AdminUsers.id", "=", userId)
            .executeTakeFirst()
    );

    if (!isUserAdmin) {
        return new NextResponse(JSON.stringify({ error: "UNAUTHORIZED" }), {
            status: 401,
        });
    }

    const imageId = ulid();

    const key = `${userId}/${imageId}`;

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
    });

    if (!url || !fields) {
        return new NextResponse(
            JSON.stringify({ error: "Could not generate presigned post" }),
            {
                status: 500,
            }
        );
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
        .execute();

    return new NextResponse(JSON.stringify({ url, fields }), {
        status: 200,
    });
}

export const runtime = "nodejs";
