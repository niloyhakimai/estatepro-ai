import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type PaginationControlsProps = {
  page: number
  pathname: string
  query?: string
  totalPages: number
}

function createHref(pathname: string, page: number, query?: string) {
  const params = new URLSearchParams()

  if (query) {
    params.set("query", query)
  }

  if (page > 1) {
    params.set("page", String(page))
  }

  const search = params.toString()
  return search ? `${pathname}?${search}` : pathname
}

export function PaginationControls({
  page,
  pathname,
  query,
  totalPages,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-3">
        <Button
          asChild={page > 1}
          variant="outline"
          className="rounded-2xl"
          disabled={page <= 1}
        >
          {page > 1 ? (
            <Link href={createHref(pathname, page - 1, query)}>
              <ChevronLeft className="size-4" />
              Previous
            </Link>
          ) : (
            <span>
              <ChevronLeft className="size-4" />
              Previous
            </span>
          )}
        </Button>

        <Button
          asChild={page < totalPages}
          variant="outline"
          className="rounded-2xl"
          disabled={page >= totalPages}
        >
          {page < totalPages ? (
            <Link href={createHref(pathname, page + 1, query)}>
              Next
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <span>
              Next
              <ChevronRight className="size-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
