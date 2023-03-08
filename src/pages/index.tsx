/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from "~/utils/api";
import { type Product, productCreationSchema } from "~/schemas/products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "~/components/Label";
import { Input } from "~/components/Input";
import { Checkbox } from "~/components/Checkbox";
import { Button } from "~/components/Button";
import { Textarea } from "~/components/Textarea";

export default function HomePage() {
    const productsQuery = api.products.list.useQuery();
    const createProductMutation = api.products.create.useMutation();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        control,
    } = useForm<Product>({
        resolver: zodResolver(productCreationSchema),
    });

    async function onSubmit(data: Product) {
        await createProductMutation.mutateAsync({ product: data });
        reset();
    }

    return (
        <div className="container mx-auto max-w-4xl">
            <ul>
                {productsQuery?.data?.map((product) => (
                    <li key={product.id}>
                        {product.id} {product.name} {product.description}
                    </li>
                ))}
            </ul>

            <form
                className="flex flex-col items-center gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label required htmlFor="name">
                        Name
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Name"
                        {...register("name")}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label required htmlFor="description">
                        Descrição{" "}
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Descrição"
                        className="resize-none"
                        rows={6}
                        {...register("description")}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label required htmlFor="price">
                        Preço
                    </Label>
                    <Input
                        type="number"
                        id="price"
                        placeholder="Preço"
                        {...register("price", {
                            valueAsNumber: true,
                        })}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                        type="text"
                        id="sku"
                        placeholder="SKU"
                        {...register("sku")}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="in_stock">Em estoque</Label>
                    <Input
                        type="number"
                        id="in_stock"
                        placeholder="Quantia em estoque"
                        {...register("inStock", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5">
                    <Checkbox
                        controllerProps={{
                            name: "active",
                            defaultValue: false,
                            //@ts-expect-error typescript doesn't know about the control prop
                            control,
                        }}
                        id="active"
                        {...register("active")}
                    />
                    <Label htmlFor="active">Ativo</Label>
                    {errors.active && (
                        <p className="text-sm text-red-500">
                            {errors.active.message}
                        </p>
                    )}
                </div>

                <Button type="submit">Create</Button>
            </form>
        </div>
    );
}
