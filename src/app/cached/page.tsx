import { appRouter } from "~/server/api/root"
import { db } from "~/server/db"

export default async function CachedPage() {
    const caller = appRouter.createCaller({ db, session: null })
    const { lastUpdated } = await caller.public.slowQueryCached()

    return (
        <div>
            Last Cache date = {new Date(lastUpdated).toLocaleTimeString()}
        </div>
    )
}
