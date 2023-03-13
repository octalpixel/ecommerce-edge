/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from "~/utils/api";
import { type Product, productCreationSchema } from "~/schemas/products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "~/components/UI/Label";
import { Input } from "~/components/UI/Input";
import { Checkbox } from "~/components/UI/Checkbox";
import { Button } from "~/components/UI/Button";
import { useState } from "react";
import { Toggle } from "~/components/UI/Toggle";
import { Editor } from "~/components/Editor";
import {CurrencyInput} from "~/components/CurrencyInput";
import { Textarea } from "~/components/UI/Textarea";

export default function HomePage() {
    const productsQuery = api.products.list.useQuery();
    const createProductMutation = api.products.create.useMutation();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        control,
        setValue,
    } = useForm<Product>({
        defaultValues:{
            inStock: null,
            active:false
        },
        resolver: zodResolver(productCreationSchema),
    });

    const [isManagedStock, setIsManagedStock] = useState(false);

    async function onSubmit(data: Product) {
        await createProductMutation.mutateAsync({ product: data });
        reset();
    }

    return (
        <div className="container mx-auto">
            <ul>
                {productsQuery?.data?.map((product) => (
                    <li key={product.id}>
                        {product.id} {product.name} {product.description}
                    </li>
                ))}
            </ul>

            <form
                className="mx-auto flex max-w-3xl flex-col items-center gap-4 bg-base dark:bg-base-dark rounded drop-shadow-lg p-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="self-start border-b text-left text-sm font-medium">
                    Detalhes
                </span>
                <Input
                    type="text"
                    id="name"
                    placeholder="Nome (Obrigatório)"
                    {...register("name")}
                >
                    Nome{" "}
                    <span className="text-xs text-slate-300">
                        (Obrigatório)
                    </span>
                </Input>

                <div className="flex w-full gap-2">
                    <Input
                        type="text"
                        id="sku"
                        placeholder="SKU"
                        {...register("sku")}
                    >
                        SKU
                    </Input>
                    <Input
                        type="number"
                        id="in_stock"
                        placeholder="Quantia em estoque"
                        disabled={!isManagedStock}
                        {...register("inStock", { valueAsNumber: true })}
                    >
                        Quantia em estoque
                    </Input>
                </div>

                <Toggle
                    checked={isManagedStock}
                    setChecked={setIsManagedStock}
                    className="self-end"
                    textSide="left"
                >
                    <span className="text-xs">Gerenciado</span>
                </Toggle>


                <Editor name="description" register={register} setValue={setValue}/>

                <CurrencyInput
                    type="number"
                    id="price"
                    placeholder="Preço"
                    name="price"
                    register={register}
                    setValue={setValue}
                >
                    Preço
                </CurrencyInput>

                <div className="flex w-full items-center gap-1.5">
                    <Checkbox
                        controllerProps={{
                            name: "active",
                            defaultValue: false,
                            //@ts-expect-error react-hook-form controller doesnt accept the generic type argument <Product> but this works
                            control,
                        }}
                        id="active"
                        {...register("active")}
                    />
                    <Label htmlFor="active">Ativo</Label>
                </div>
                    {Object.entries(errors).map(([key, value]) => (
                        <span key={key}>{key}{value.message}</span>
                    ))}
                <Button type="submit" >Create</Button>
            </form>
        </div>
    );
}
