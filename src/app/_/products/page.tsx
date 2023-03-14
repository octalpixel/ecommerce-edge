import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { ProductList } from "~/components/ProductList";

export const fetchCache = "force-no-store";

export default async function ProductsPage() {
    // const ssg = createProxySSGHelpers({
    //     router: appRouter,
    //     ctx: createInnerTRPCContext({
    //         session: null,
    //     }),
    //     transformer: superjson,
    // });

    // await ssg.products.list.prefetch();

    const caller = appRouter.createCaller({ db, session: null });
    const initialData = await caller.products.list();

    return (
        <div>
            <h1>Products</h1>
            <ProductList initialData={initialData} />
        </div>
    );
}
