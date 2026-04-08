import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    <Card>
      <CardContent className="flex flex-col items-center px-6 py-14 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-[1.7rem] bg-primary/10 text-primary">
          <Icon className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold text-foreground">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
        {actionHref && actionLabel ? (
          <Button asChild className="mt-7 rounded-2xl">
            <Link href={actionHref}>
              {actionLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
