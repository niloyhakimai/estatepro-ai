import Link from "next/link"
import { Filter, Search, SlidersHorizontal } from "lucide-react"

import {
  bedroomOptions,
  priceOptions,
  type ExploreFilters,
} from "@/components/explore/explore-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

type ExploreFiltersProps = {
  filters: ExploreFilters
  totalCount: number
}

export function ExploreFiltersPanel({
  filters,
  totalCount,
}: ExploreFiltersProps) {
  return (
    <Card className="lg:sticky lg:top-28 border-border/40 shadow-2xl bg-background/80 backdrop-blur-xl rounded-[2rem] overflow-hidden transition-all duration-300">
      <CardHeader className="space-y-5 pb-6 border-b border-border/30 bg-secondary/10">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 py-1 px-3 shadow-sm">
            Filters
          </Badge>
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-background shadow-sm border border-border/50 text-primary">
            <SlidersHorizontal className="size-4" />
          </span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Refine your search</CardTitle>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Narrow results by location, price, and bedrooms. The URL updates automatically so your search stays shareable.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <form action="/explore" className="space-y-5">
          <input type="hidden" name="sort" value={filters.sort} />

          <div className="space-y-2.5">
            <label
              htmlFor="filter-location"
              className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80"
            >
              Location
            </label>
            <div className="relative group">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary" />
              <Input
                id="filter-location"
                name="location"
                defaultValue={filters.location}
                placeholder="City, ZIP, or neighborhood"
                className="pl-11 h-12 rounded-xl bg-background/50 border-border/60 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="filter-price"
              className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80"
            >
              Price Range
            </label>
            <Select 
              id="filter-price" 
              name="price" 
              defaultValue={filters.price}
              className="h-12 rounded-xl bg-background/50 border-border/60"
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="filter-bedrooms"
              className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80"
            >
              Bedrooms
            </label>
            <Select
              id="filter-bedrooms"
              name="bedrooms"
              defaultValue={filters.bedrooms}
              className="h-12 rounded-xl bg-background/50 border-border/60"
            >
              {bedroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row lg:flex-col">
            <Button type="submit" className="w-full rounded-xl h-12 text-base font-bold shadow-md transition-transform hover:-translate-y-0.5">
              <Filter className="mr-2 size-4" />
              Apply filters
            </Button>
            <Button asChild variant="outline" className="w-full rounded-xl h-12 text-base font-bold border-border/60 bg-background/50 backdrop-blur-sm transition-transform hover:-translate-y-0.5">
              <Link href="/explore">Clear filters</Link>
            </Button>
          </div>
        </form>

        <div className="rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5 backdrop-blur-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
            </span>
            Live Results
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-bold text-foreground drop-shadow-sm">{totalCount}</p>
            <p className="text-sm font-medium text-muted-foreground">matches found</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}