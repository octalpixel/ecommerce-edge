"use client";
import { useDropzone } from "react-dropzone";

export function Dropzone() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    return (
        <div>
            <div {...getRootProps({ className: "border rounded dark:border-zinc-600 p-4 cursor-pointer" })}>
                <input {...getInputProps()} />
                <p>Arraste arquivos aqui ou clique para selecionar</p>
            </div>
            <div>
                <h4>Imagens</h4>
                <ul>
                    {acceptedFiles.map((file) => (
                        //@ts-expect-error path exists, but typescript doesnt know
                        <li key={file.path}>
                        {/* @ts-expect-error path exists, but typescript doesnt know */}
                            {file.path} - {file.size} bytes
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

