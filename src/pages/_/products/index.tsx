import { appRouter } from "~/server/api/root"
import { ProductList } from "~/components/CreateProduct/ProductList"
import type { GetServerSideProps } from "next"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { createInnerTRPCContext } from "~/server/api/trpc"

import superjson from "superjson"

export const getServerSideProps = (async () => {
    const ssg = createProxySSGHelpers({
        ctx: createInnerTRPCContext({ session: null }),
        router: appRouter,
        transformer: superjson,
    })
    await ssg.public.listProducts.prefetch()

    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
    }
}) satisfies GetServerSideProps

export default function ProductsPage() {
    return (
        <div>
            <h1>Products</h1>
            <ProductList />
        </div>
    )
}
