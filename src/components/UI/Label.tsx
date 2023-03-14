"use client"

import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef } from "react";
import { cn } from "~/utils/cn";

const Label = forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
        required?: boolean;
    }
>(({ className, required, ...props }, ref) =>
    required ? (
        <div className="flex items-center">
            <LabelPrimitive.Root
                ref={ref}
                className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    className
                )}
                {...props}
            />{" "}
            <span className="text-sm text-red-500">*</span>
        </div>
    ) : (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
