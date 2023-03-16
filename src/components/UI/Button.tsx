"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "~/utils/cn"

const buttonVariants = cva(
    "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none default-focus text-slate-800 dark:text-slate-100",
    {
        variants: {
            variant: {
                default: "bg-primary text-slate-100 hover:bg-primary-emphasis",
                destructive: "bg-red-500 text-white hover:bg-red-600",
                outline:
                    "bg-transparent border border-primary hover:bg-primary/20",
                subtle: "bg-primary/20 hover:bg-primary/30 dark:bg-primary/70 dark:hover:bg-primary/80",
                ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
                link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-2 rounded-md",
                lg: "h-11 px-8 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
