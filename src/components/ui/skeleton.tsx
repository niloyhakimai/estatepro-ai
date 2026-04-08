import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-2xl bg-muted/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
