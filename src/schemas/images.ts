import { z } from "zod";
import { formatBytes } from "~/utils/formatBytes";

// 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const imageSchema = z.object({
    files: z.custom<FileList>((z) => z instanceof FileList, "Arquivo de imagem inválido.")
        .refine((files) => files?.length == 1, "Uma imagem é necessária.")
        .refine(
            (files) => files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
            "Somente arquivos .jpg, .jpeg, .png and .webp são permitidos."
        )
        .refine((files) => files[0] && files[0].size <= MAX_FILE_SIZE, `A imagem deve ter no máximo ${formatBytes(MAX_FILE_SIZE)}.`)
});
export type ImageSchema = z.infer<typeof imageSchema>;