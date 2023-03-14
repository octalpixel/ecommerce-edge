import { db } from "~/server/db";
import { listProducts } from "~/server/services/products";

export default async function ProductsPage() {
    const products = await listProducts(db);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}
