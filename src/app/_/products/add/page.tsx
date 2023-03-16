"use client"

/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from "~/utils/api"
import { type Product, productCreationSchema } from "~/schemas/products"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "~/components/UI/Label"
import { Input } from "~/components/UI/Input"
import { Checkbox } from "~/components/UI/Checkbox"
import { Button } from "~/components/UI/Button"
import { useState } from "react"
import { Toggle } from "~/components/UI/Toggle"
import { Editor } from "~/components/CreateProduct/Editor"
import { CurrencyInput } from "~/components/CreateProduct/CurrencyInput"
import { useToast } from "~/hooks/use-toast"
import { Dropzone } from "~/components/Dropzone"

export default function AddProductPage() {
    const { toast } = useToast()
    const ctx = api.useContext()

    const createProductMutation = api.products.create.useMutation({
        onSuccess: async () => {
            toast({
                title: "Produto criado com sucesso",
            })
            await ctx.public.listProducts.invalidate()
        },
        onError: () => {
            toast({
                title: "Ocorreu um erro ao criar o produto",
            })
        },
    })

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm<Product>({
        defaultValues: {
            inStock: null,
            active: false,
        },
        resolver: zodResolver(productCreationSchema),
    })

    const [isManagedStock, setIsManagedStock] = useState(false)

    async function onSubmit(data: Product) {
        console.log({ data })
        toast({
            title: "Criando produto...",
        })
        await createProductMutation.mutateAsync({ product: data })
        reset()
    }

    return (
        <div className="container mx-auto flex h-screen items-center justify-center">
            <form
                className="mx-auto flex max-w-3xl flex-col gap-4 rounded bg-base p-4 drop-shadow-lg dark:bg-base-dark"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="self-start border-b text-left text-sm font-medium">
                    Detalhes
                </span>
                <Input type="text" id="name" {...register("name")}>
                    Nome{" "}
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        (Obrigatório)
                    </span>
                </Input>
                {errors.name && (
                    <p className="-mt-2 text-xs text-red-500">
                        {errors.name.message}
                    </p>
                )}

                <div className="flex w-full gap-2">
                    <div className="relative w-full">
                        <Input
                            type="text"
                            id="sku"
                            placeholder="SKU"
                            {...register("sku")}
                        >
                            SKU
                        </Input>
                        {errors.sku && (
                            <p className="absolute -bottom-5 text-xs text-red-500">
                                {errors.sku.message}
                            </p>
                        )}
                    </div>
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

                <Editor
                    name="description"
                    register={register}
                    setValue={setValue}
                />
                {errors.description && (
                    <p className="-mt-2 text-xs text-red-500">
                        {errors.description.message}
                    </p>
                )}

                <Dropzone />

                <CurrencyInput
                    type="number"
                    id="price"
                    placeholder="Preço"
                    name="price"
                    register={register}
                    setValue={setValue}
                >
                    Preço{" "}
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        (Obrigatório)
                    </span>
                </CurrencyInput>
                {errors.price && (
                    <p className="-mt-2 text-xs text-red-500">
                        {errors.price.message} Received: {getValues("price")}
                    </p>
                )}

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
                <Button type="submit">Criar produto</Button>
            </form>
        </div>
    )
}
export const runtime = "experimental-edge"
export const preferredRegion = "home"
