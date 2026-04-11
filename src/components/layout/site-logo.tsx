/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { cn } from "@/lib/utils"

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex min-w-0 items-center gap-3.5 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]",
        className
      )}
    >
      <span className="relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-background/80 shadow-[0_18px_48px_-22px_rgba(41,194,179,0.45)] backdrop-blur-xl">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop"
          alt="EstatePro logo mark"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-[linear-gradient(145deg,rgba(41,194,179,0.46),rgba(7,14,21,0.24),rgba(215,171,99,0.26))]" />
        <span className="absolute inset-[1px] rounded-[calc(1rem-1px)] ring-1 ring-white/10" />
      </span>

      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-[0.63rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
          Premium Property System
        </span>
        <span className="truncate text-xl font-semibold tracking-tight text-foreground">
          EstatePro
        </span>
      </span>
    </Link>
  )
}
