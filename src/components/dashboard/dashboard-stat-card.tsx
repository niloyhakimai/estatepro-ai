import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type DashboardStatCardProps = {
  description: string
  icon: LucideIcon
  label: string
  value: string
}

export function DashboardStatCard({
  description,
  icon: Icon,
  label,
  value,
}: DashboardStatCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary">{label}</Badge>
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
