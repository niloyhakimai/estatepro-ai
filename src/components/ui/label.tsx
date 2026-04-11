import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors dark:text-white/60",
        className
      )}
      {...props}
    />
  )
}

export { Label }