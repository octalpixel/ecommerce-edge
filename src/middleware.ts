import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { db } from "~/server/db"

// Set the paths that don't require the user to be signed in

function isAdminPath(path: string) {
    const regex = /^\/_/
    return regex.test(path)
}

export default withClerkMiddleware(async (req: NextRequest) => {
    if (!isAdminPath(req.nextUrl.pathname)) {
        return NextResponse.next()
    }

    const { userId } = getAuth(req)

    if (!userId) {
        const redirectUrl = new URL("/", req.url)
        return NextResponse.redirect(redirectUrl)
    }

    const user = await db
        .selectFrom("AdminUsers")
        .where("AdminUsers.id", "=", userId)
        .select("AdminUsers.id")
        .executeTakeFirst()

    const isAdmin = Boolean(user)

    if (!isAdmin) {
        const redirectUrl = new URL("/", req.url)
        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
})

// Stop Middleware running on static files
export const config = { matcher:  '/((?!_next/image|_next/static|favicon.ico).*)'};
