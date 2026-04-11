import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[0_16px_44px_-22px_rgba(21,159,149,0.72)] hover:-translate-y-0.5 hover:bg-primary/92 dark:shadow-[0_18px_48px_-22px_rgba(41,194,179,0.55)]",
        outline:
          "border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur-md hover:bg-muted/70 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 dark:bg-white/[0.06] dark:text-foreground dark:hover:bg-white/[0.1]",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-muted/70 dark:hover:bg-white/[0.08]",
        destructive: "border-transparent bg-destructive text-white shadow-sm hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded-lg px-3 text-xs",
        sm: "h-9 rounded-xl px-3.5 text-sm",
        lg: "h-11 rounded-2xl px-5 text-sm",
        icon: "size-10 rounded-full",
        "icon-xs": "size-8 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
