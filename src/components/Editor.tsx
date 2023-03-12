import type { Product } from "~/schemas/products";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

const emptyValues = ["<p><br></p>", "<h1><br></h1>", "<h2><br></h2>"];

type EditorProps<T extends FieldValues> = {
    name: keyof T;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
};

export function Editor({ name, register, setValue }: EditorProps<Product>) {
    const [value, _setValue] = useState("");
    const [hasContent, setHasContent] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setHasContent(value.length > 0 && !emptyValues.includes(value));
    }, [value]);

    useEffect(() => {
        register(name);
    }, [name, register]);

    return (
        <div className="relative z-[999] h-48 w-full rounded border bg-white shadow-md">
            <span
                className={clsx(
                    "absolute top-4 left-2 text-sm text-slate-700 transition-all duration-300",
                    {
                        "translate-y-[-100%] translate-x-[-10%] scale-75":
                            isFocused || hasContent,
                    }
                )}
            >
                Descrição
            </span>
            <ReactQuill
                theme="bubble"
                className="h-full"
                value={value}
                onChange={(value) => {
                    setValue(name, value);
                    _setValue(value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}
