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
    <div className="flex flex-col gap-4 rounded-[2rem] border border-border/40 bg-background/60 px-6 py-4 shadow-lg backdrop-blur-xl transition-all duration-300 sm:flex-row sm:items-center sm:justify-between mt-8">
      <p className="text-sm font-medium text-muted-foreground bg-secondary/50 px-4 py-1.5 rounded-full border border-border/30">
        Page <span className="text-foreground font-bold">{page}</span> of <span className="text-foreground font-bold">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          asChild={page > 1}
          variant="outline"
          className={cn(
            "rounded-xl h-10 px-4 font-bold border-border/60 bg-background/50 transition-all duration-300",
            page > 1 ? "hover:bg-primary/10 hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 active:scale-95" : "opacity-50 cursor-not-allowed"
          )}
          disabled={page <= 1}
        >
          {page > 1 ? (
            <Link href={buildExploreHref(filters, page - 1)}>
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Link>
          ) : (
            <span>
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </span>
          )}
        </Button>

        <div className="flex items-center gap-1.5 hidden sm:flex">
          {visiblePages.map((pageNumber) => (
            <Button
              key={pageNumber}
              asChild={pageNumber !== page}
              variant={pageNumber === page ? "default" : "outline"}
              className={cn(
                "min-w-10 h-10 rounded-xl font-bold transition-all duration-300",
                pageNumber === page
                  ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 scale-105"
                  : "border-border/60 bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 active:scale-95"
              )}
            >
              {pageNumber === page ? (
                <span>{pageNumber}</span>
              ) : (
                <Link href={buildExploreHref(filters, pageNumber)}>{pageNumber}</Link>
              )}
            </Button>
          ))}
        </div>

        <Button
          asChild={page < totalPages}
          variant="outline"
          className={cn(
            "rounded-xl h-10 px-4 font-bold border-border/60 bg-background/50 transition-all duration-300",
            page < totalPages ? "hover:bg-primary/10 hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 active:scale-95" : "opacity-50 cursor-not-allowed"
          )}
          disabled={page >= totalPages}
        >
          {page < totalPages ? (
            <Link href={buildExploreHref(filters, page + 1)}>
              Next
              <ChevronRight className="ml-1 size-4" />
            </Link>
          ) : (
            <span>
              Next
              <ChevronRight className="ml-1 size-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}