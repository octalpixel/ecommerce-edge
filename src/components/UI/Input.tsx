"use client"

import { forwardRef } from "react";
import { cn } from "~/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    children: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type="text"
                    id={props.id}
                    className={cn(
                        "default-focus peer block w-full appearance-none rounded border px-2.5 pb-2.5 pt-5 text-sm drop-shadow transition-colors disabled:pointer-events-none disabled:opacity-60 dark:border-zinc-600 bg-base dark:bg-neutral-dark",
                        className
                    )}
                    {...props}
                    placeholder=" "
                    ref={ref}
                />
                <label
                    htmlFor={props.id}
                    className="absolute top-4 left-3 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-disabled:opacity-50"
                >
                    {children}
                </label>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
