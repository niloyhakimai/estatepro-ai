import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-[1.15rem] border border-black/10 bg-white/50 px-4 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-inner outline-none transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10",
        className
      )}
      {...props}
    />
  )
}

export { Input }