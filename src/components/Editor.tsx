import type { Product } from "~/schemas/products";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type {
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
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
        <div
            className={clsx(
                "relative z-[999] h-48 w-full rounded border dark:border-zinc-700 bg-base dark:bg-base-dark dark:text-slate-100 shadow-md",
                {
                    "outline outline-2 outline-primary outline-offset-2": isFocused,
                }
            )}
        >
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
                //make tab key focus next input
                onKeyDown={(e: KeyboardEvent) => {
                    if (e.key === "Tab") {
                        let nextSibling: HTMLDivElement | undefined = undefined;

                        //get the next div that contains inputs
                        const target = e.target as HTMLDivElement;
                        const parentDiv =
                            target?.parentElement?.parentElement?.parentElement;
                        if (!parentDiv) return;

                        nextSibling =
                            parentDiv.nextElementSibling as HTMLDivElement;

                        if (!nextSibling) return;

                        const input = nextSibling.querySelector("input");

                        if (!input) return;

                        input.focus();
                    }
                }}
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
