import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DashboardEmptyStateProps = {
  actionHref?: string
  actionLabel?: string
  description: string
  icon: LucideIcon
  title: string
}

export function DashboardEmptyState({
  actionHref,
  actionLabel,
  description,
  icon: Icon,
  title,
}: DashboardEmptyStateProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-10 text-center">
        <span className="mb-2 inline-flex size-20 items-center justify-center rounded-[1.75rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_40px_-15px_rgba(21,159,149,0.3)] transition-colors dark:bg-primary/20 dark:shadow-[0_0_40px_-15px_rgba(41,194,179,0.5)]">
          <Icon className="size-8 shrink-0" />
        </span>
        
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
        
        <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-white/70">
          {description}
        </p>
        
        {actionHref && actionLabel ? (
          <Button 
            asChild 
            className="mt-8 h-12 rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
          >
            <Link href={actionHref}>
              {actionLabel}
              <ArrowRight className="ml-2 size-4 shrink-0" />
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}