import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-[1.15rem] bg-black/5 transition-colors dark:bg-white/5",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }