"use client"

import { type PresignedPost } from "@aws-sdk/s3-presigned-post"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { imageSchema, type ImageSchema } from "~/schemas/images"

export type PresignedPostResponse = {
    url: string
    fields: PresignedPost["fields"]
}

export default function ImagesPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ImageSchema>({
        mode: "onChange",
        resolver: zodResolver(imageSchema),
    })

    async function onSubmit(data: ImageSchema) {
        if (!data.files[0]) throw new Error("Nenhuma imagem selecionada")

        const res = await fetch("/api/presigned-post", {
            method: "POST",
        })

        const { fields, url } = (await res.json()) as PresignedPostResponse

        const _formData: Record<string, string | Blob> = {
            ...fields,
            "Content-Type": data.files[0].type,
            file: data.files[0],
        }

        const formData = new FormData()

        for (const key in _formData) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            formData.append(key, _formData[key]!)
        }

        await fetch(url, {
            method: "POST",
            body: formData,
        })
    }

    return (
        <div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    {...register("files")}
                />
                {errors.files?.message && (
                    <p className="text-xs text-red-500">
                        {errors.files.message}
                    </p>
                )}
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
