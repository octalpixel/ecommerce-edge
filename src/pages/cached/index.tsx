import { type GetServerSideProps } from "next"
import { appRouter } from "~/server/api/root"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { createInnerTRPCContext } from "~/server/api/trpc"
import superjson from "superjson"
import { api } from "~/utils/api"

export const getServerSideProps = (async () => {
    const ssg = createProxySSGHelpers({
        ctx: createInnerTRPCContext({ session: null }),
        router: appRouter,
        transformer: superjson,
    })
    await ssg.public.slowQueryCached.prefetch()

    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
    }
}) satisfies GetServerSideProps

export default function CachedPage() {
    const { data } = api.public.slowQueryCached.useQuery()

    if (!data) return null

    return (
        <div>
            Last Cache date = {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
    )
}
