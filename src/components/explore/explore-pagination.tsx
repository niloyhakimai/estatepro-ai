"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { ExploreFilters } from "@/components/explore/explore-utils"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ExplorePaginationProps = {
  filters: ExploreFilters
  page: number
  totalPages: number
}

function buildExploreHref(filters: ExploreFilters, page: number) {
  const params = new URLSearchParams()

  if (filters.location) {
    params.set("location", filters.location)
  }

  if (filters.price !== "any") {
    params.set("price", filters.price)
  }

  if (filters.bedrooms !== "any") {
    params.set("bedrooms", filters.bedrooms)
  }

  if (filters.sort !== "newest") {
    params.set("sort", filters.sort)
  }

  if (page > 1) {
    params.set("page", String(page))
  }

  const query = params.toString()
  return query ? `/explore?${query}` : "/explore"
}

function getVisiblePages(page: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (page <= 3) {
    return [1, 2, 3, 4, 5]
  }

  if (page >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [page - 2, page - 1, page, page + 1, page + 2]
}

export function ExplorePagination({
  filters,
  page,
  totalPages,
}: ExplorePaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const visiblePages = getVisiblePages(page, totalPages)

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-[1.9rem] border border-black/5 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="rounded-full border border-black/5 bg-black/5 px-4 py-2 text-sm font-medium text-slate-600 transition-colors dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70">
        Page <span className="font-semibold text-slate-900 dark:text-white">{page}</span> of{" "}
        <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          asChild={page > 1}
          variant="outline"
          className={cn(
            "h-10 rounded-[1rem] border-black/10 bg-white/50 px-4 font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
            page <= 1 && "cursor-not-allowed opacity-50"
          )}
          disabled={page <= 1}
        >
          {page > 1 ? (
            <Link href={buildExploreHref(filters, page - 1)}>
              <ChevronLeft className="size-4 shrink-0" />
              Previous
            </Link>
          ) : (
            <span>
              <ChevronLeft className="size-4 shrink-0" />
              Previous
            </span>
          )}
        </Button>

        <div className="hidden items-center gap-1.5 sm:flex">
          {visiblePages.map((pageNumber) => {
            const isActive = pageNumber === page;
            return (
              <Button
                key={pageNumber}
                asChild={!isActive}
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "min-w-10 h-10 rounded-[1rem] font-semibold transition-all duration-300",
                  isActive
                    ? "bg-slate-900 text-white shadow-md hover:bg-slate-800 dark:bg-[#29c2b3] dark:text-black dark:shadow-[0_18px_40px_-24px_rgba(41,194,179,0.75)] dark:hover:bg-[#22a194]"
                    : "border-black/10 bg-white/50 text-slate-700 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                )}
              >
                {isActive ? (
                  <span>{pageNumber}</span>
                ) : (
                  <Link href={buildExploreHref(filters, pageNumber)}>{pageNumber}</Link>
                )}
              </Button>
            );
          })}
        </div>

        <Button
          asChild={page < totalPages}
          variant="outline"
          className={cn(
            "h-10 rounded-[1rem] border-black/10 bg-white/50 px-4 font-semibold text-slate-700 transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
            page >= totalPages && "cursor-not-allowed opacity-50"
          )}
          disabled={page >= totalPages}
        >
          {page < totalPages ? (
            <Link href={buildExploreHref(filters, page + 1)}>
              Next
              <ChevronRight className="size-4 shrink-0" />
            </Link>
          ) : (
            <span>
              Next
              <ChevronRight className="size-4 shrink-0" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}