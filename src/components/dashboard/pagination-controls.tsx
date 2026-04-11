import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="rounded-full border border-black/5 bg-black/[0.02] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500 transition-colors dark:border-white/10 dark:bg-white/[0.02] dark:text-white/50">
        Page <span className="text-slate-900 dark:text-white">{page}</span> of <span className="text-slate-900 dark:text-white">{totalPages}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          asChild={page > 1}
          variant="outline"
          className={cn(
            "h-10 rounded-[1.15rem] border-black/10 bg-white/50 px-5 font-bold text-slate-700 shadow-sm transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
            page <= 1 && "cursor-not-allowed opacity-50"
          )}
          disabled={page <= 1}
        >
          {page > 1 ? (
            <Link href={createHref(pathname, page - 1, query)}>
              <ChevronLeft className="mr-1.5 size-4 shrink-0" />
              Previous
            </Link>
          ) : (
            <span>
              <ChevronLeft className="mr-1.5 size-4 shrink-0" />
              Previous
            </span>
          )}
        </Button>

        <Button
          asChild={page < totalPages}
          variant="outline"
          className={cn(
            "h-10 rounded-[1.15rem] border-black/10 bg-white/50 px-5 font-bold text-slate-700 shadow-sm transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
            page >= totalPages && "cursor-not-allowed opacity-50"
          )}
          disabled={page >= totalPages}
        >
          {page < totalPages ? (
            <Link href={createHref(pathname, page + 1, query)}>
              Next
              <ChevronRight className="ml-1.5 size-4 shrink-0" />
            </Link>
          ) : (
            <span>
              Next
              <ChevronRight className="ml-1.5 size-4 shrink-0" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}