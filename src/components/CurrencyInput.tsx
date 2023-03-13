import { useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import ReactCurrencyInput from "react-currency-input-field";
import type {
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import { type Product } from "~/schemas/products";

export type InputProps<T extends FieldValues> =
    React.InputHTMLAttributes<HTMLInputElement> & {
        children: React.ReactNode;
        name: keyof T;
        register: UseFormRegister<T>;
        setValue: UseFormSetValue<T>;
    };

export function CurrencyInput({
    className,
    children,
    name,
    register,
    setValue,
}: InputProps<Product>) {
    const [value, _setValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        register(name);
    }, [name, register]);

    return (
        <div className="relative w-full">
            <ReactCurrencyInput
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                name={name}
                className={cn(
                    "peer block w-full appearance-none rounded border dark:border-zinc-600 bg-white px-2.5 pb-2.5 pt-5 text-sm drop-shadow transition-colors disabled:pointer-events-none disabled:opacity-60 dark:bg-neutral-dark default-focus",
                    className
                )}
                placeholder=" "
                value={value}
                onValueChange={(value) => {
                    if (!value) return;
                    _setValue(value);
                    setValue(name, value);
                }}
            />
            <label
                htmlFor={name}
                className="absolute top-4 left-3 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-disabled:opacity-50"
            >
                {children}
            </label>
        </div>
    );
}
