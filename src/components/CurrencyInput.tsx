import { useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import ReactCurrencyInput from "react-currency-input-field";
import type { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
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
        register(name, { valueAsNumber: true });
    }, [name,register]);

    return (
        <div className="relative w-full">
            <ReactCurrencyInput
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                name={name}
                className={cn(
                    "peer block w-full appearance-none rounded border bg-white px-2.5 pb-2.5 pt-5 text-sm text-slate-900 drop-shadow transition-colors hover:border-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
                    className
                )}
                placeholder=" "
                value={value}
                onValueChange={(value) => {
                    _setValue(value);
                    setValue(name, value!);
                }}
            />
            <label
                htmlFor={name}
                className="absolute top-4 left-3 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-slate-700 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-disabled:opacity-50 dark:text-slate-400"
            >
                {children}
            </label>
        </div>
    );
}
