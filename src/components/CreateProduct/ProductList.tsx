import Link from "next/link"
import { api } from "~/utils/api"

export function ProductList() {
    const { data: products, isLoading } = api.public.listProducts.useQuery(
        undefined,
        {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        }
    )
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {products?.map((product) => (
                        <li key={product.id}>
                            <Link href={`/products/${product.id}`}>
                                {product.name}{" "}
                                {new Date(
                                    product.createdAt
                                ).toLocaleDateString()}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
