import { forwardRef } from "react";
import {cn} from "~/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    children: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className,children, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type="text"
                    id={props.id}
                    className={cn("peer block w-full appearance-none rounded drop-shadow border focus:border-slate-500 hover:border-slate-500 bg-white px-2.5 pb-2.5 pt-5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-60 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white", className)}
                    {...props}
                    placeholder=" "
                    ref={ref}
                />
                <label
                    htmlFor={props.id}
                    className="absolute top-4 left-3 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-slate-700 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 dark:text-slate-400 peer-disabled:opacity-50"
                >
                    {children}
                </label>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
