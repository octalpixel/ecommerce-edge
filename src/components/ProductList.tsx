"use client";

import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";
type Product = RouterOutputs["products"]["list"][number];

type ProductListProps = {
    initialData?: Product[];
};

export function ProductList(props: ProductListProps) {
    const { data: products, isLoading } = api.products.list.useQuery(
        undefined,
        {
            initialData: props.initialData,
            staleTime: 1000 * 60, // 1 minute
            refetchOnMount: false,
        }
    );
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
    );
}
