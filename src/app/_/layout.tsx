import { currentUser } from "@clerk/nextjs/app-beta"
import { redirect } from "next/navigation"
import { db } from "~/server/db"
import { isUserAdmin } from "~/server/services/admin-users"

export default async function AdminLayout(props: {
    children: React.ReactNode
}) {
    const user = await currentUser()

    if (!user) redirect("/")

    const isAdminUser = await isUserAdmin(db, user.id)

    if (!isAdminUser) redirect("/")

    return <main>{props.children}</main>
}
