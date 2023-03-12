import {
    forwardRef,
    type Dispatch,
    type SetStateAction,
    type InputHTMLAttributes,
} from "react";
import { cn } from "~/utils/cn";

export type ToggleProps = {
    value?: string | number;
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
    textSide?: "left" | "right";
} & InputHTMLAttributes<HTMLInputElement>;

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
    ({ value, setChecked, checked, children, className, textSide = "right" }, ref) => {
        return textSide === "right" ? (
            <label
                className={cn(
                    "relative flex cursor-pointer items-center",
                    className
                )}
            >
                <input
                    type="checkbox"
                    value={value}
                    onChange={() => setChecked((prev) => !prev)}
                    checked={checked}
                    className="peer sr-only"
                    ref={ref}
                />
                <div className="peer h-6 w-11 rounded-full bg-neutral dark:bg-neutral-dark after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary-emphasis dark:border-slate-200"></div>

                <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {children}
                </span>
            </label>
        ) : (
            <label
                className={cn(
                    "relative flex cursor-pointer items-center",
                    className
                )}
            >
                <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {children}
                </span>
                <input
                    type="checkbox"
                    value={value}
                    onChange={() => setChecked((prev) => !prev)}
                    checked={checked}
                    className="peer sr-only"
                    ref={ref}
                />
                <div className="peer h-6 w-11 rounded-full bg-neutral dark:bg-neutral-dark after:absolute after:top-[2px] after:right-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:-translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-emphasis peer-focus:ring-offset-2 dark:border-slate-200"></div>
            </label>
        )
    }
);

Toggle.displayName = "Toggle";

export { Toggle };
