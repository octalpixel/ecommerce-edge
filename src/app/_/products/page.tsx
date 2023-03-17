import { appRouter } from "~/server/api/root"
import { db } from "~/server/db"
import { ProductList } from "~/components/CreateProduct/ProductList"

export default async function ProductsPage() {
    const caller = appRouter.createCaller({ db, session: null })
    const initialData = await caller.public.listProducts()

    return (
        <div>
            <h1>Products</h1>
            <ProductList initialData={initialData} />
        </div>
    )
}
export const runtime = "edge"
