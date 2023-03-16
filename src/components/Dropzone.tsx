"use client"
import { useDropzone } from "react-dropzone"

type _File = File & { path: string }

export function Dropzone() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
    return (
        <div>
            <div
                {...getRootProps({
                    className:
                        "border rounded dark:border-zinc-600 p-4 cursor-pointer",
                })}
            >
                <input {...getInputProps()} />
                <p>Arraste arquivos aqui ou clique para selecionar</p>
            </div>
            <div>
                <h4>Imagens</h4>
                <ul>
                    {/* @ts-expect-error path exists, but typescript doesnt know */}
                    {acceptedFiles.map((file: _File) => (
                        <li key={file.path}>
                            {file.path} - {file.size} bytes
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
