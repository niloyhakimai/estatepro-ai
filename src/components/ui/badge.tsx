import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/12 text-primary dark:bg-primary/16",
        secondary:
          "border-border/70 bg-secondary/85 text-secondary-foreground dark:border-white/10 dark:bg-white/[0.06] dark:text-foreground",
        outline:
          "border-border/70 bg-background/80 text-foreground dark:border-white/10 dark:bg-white/[0.04]",
        accent: "border-transparent bg-accent/18 text-foreground dark:bg-accent/20 dark:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
