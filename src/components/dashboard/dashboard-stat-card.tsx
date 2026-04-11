import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DashboardStatCardProps = {
  className?: string
  description: string
  icon: LucideIcon
  label: string
  value: string
}

export function DashboardStatCard({
  className,
  description,
  icon: Icon,
  label,
  value,
}: DashboardStatCardProps) {
  return (
    <Card 
      className={cn(
        "h-full overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 shadow-sm backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40",
        className
      )}
    >
      <CardContent className="flex h-full flex-col justify-center p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <Badge 
            variant="secondary" 
            className="bg-primary/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-primary shadow-none transition-colors dark:bg-primary/20"
          >
            {label}
          </Badge>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.05]">
            <Icon className="size-5 text-primary" />
          </span>
        </div>
        
        <div className="mt-6 space-y-1.5">
          <p className="text-4xl font-bold tracking-tight text-slate-900 transition-colors dark:text-white">
            {value}
          </p>
          <p className="text-[0.8rem] font-medium leading-relaxed text-slate-500 transition-colors dark:text-white/60">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}