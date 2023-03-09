import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "~/utils/cn";
import { Controller, type ControllerProps } from "react-hook-form";

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        controllerProps: ControllerProps;
    }
>(({ className, controllerProps, ...props }, ref) => (
    <Controller
        {...controllerProps}
        render={({ field }) => (
            <CheckboxPrimitive.Root
                {...field}
                checked={Boolean(field.value)}
                onCheckedChange={field.onChange}
                ref={ref}
                className={cn(
                    "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
                    className
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    className={cn("flex items-center justify-center")}
                >
                    <Check className="h-4 w-4" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        )}
    />
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };