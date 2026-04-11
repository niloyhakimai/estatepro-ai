"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ExploreFiltersProps = {
  filters: ExploreFilters
  totalCount: number
}

export function ExploreFiltersPanel({
  filters,
  totalCount,
}: ExploreFiltersProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] lg:sticky lg:top-28">
      <CardHeader className="space-y-5 border-b border-black/5 bg-black/[0.02] pb-6 transition-colors dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="bg-primary/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-primary dark:bg-primary/20">
            Filters
          </Badge>
          <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-black/5 bg-black/5 text-primary transition-colors dark:border-white/10 dark:bg-white/[0.05]">
            <SlidersHorizontal className="size-4 shrink-0" />
          </span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">Refine your search</CardTitle>
          <p className="text-sm leading-7 text-slate-600 dark:text-white/70">
            Narrow results by location, price, and bedrooms while keeping the
            filter state shareable in the URL.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <form action="/explore" className="space-y-5">
          <input type="hidden" name="sort" value={filters.sort} />

          <div className="space-y-2.5">
            <label
              htmlFor="filter-location"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Location
            </label>
            <div className="group relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-primary dark:text-white/40" />
              <Input
                id="filter-location"
                name="location"
                defaultValue={filters.location}
                placeholder="City, ZIP, or neighborhood"
                className="h-12 rounded-[1rem] border-black/10 bg-white/50 pl-11 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/20 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/20"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="filter-price"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Price Range
            </label>
            <Select
              name="price"
              defaultValue={filters.price}
            >
              <SelectTrigger id="filter-price" className="h-12 rounded-[1rem] border-black/10 bg-white/50 text-slate-900 shadow-sm transition-all focus:border-black/20 focus:bg-white focus:ring-1 focus:ring-black/20 data-[state=open]:bg-white dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-white/20 dark:focus:bg-black/40 dark:focus:ring-white/20 dark:data-[state=open]:bg-black/40">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent className="border-border/70 bg-popover/85 text-popover-foreground backdrop-blur-xl dark:border-white/10 dark:bg-black/80 dark:text-white">
                {priceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer focus:bg-secondary/60 dark:focus:bg-white/10 dark:focus:text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="filter-bedrooms"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Bedrooms
            </label>
            <Select
              name="bedrooms"
              defaultValue={filters.bedrooms}
            >
              <SelectTrigger id="filter-bedrooms" className="h-12 rounded-[1rem] border-black/10 bg-white/50 text-slate-900 shadow-sm transition-all focus:border-black/20 focus:bg-white focus:ring-1 focus:ring-black/20 data-[state=open]:bg-white dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-white/20 dark:focus:bg-black/40 dark:focus:ring-white/20 dark:data-[state=open]:bg-black/40">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent className="border-border/70 bg-popover/85 text-popover-foreground backdrop-blur-xl dark:border-white/10 dark:bg-black/80 dark:text-white">
                {bedroomOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer focus:bg-secondary/60 dark:focus:bg-white/10 dark:focus:text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row lg:flex-col">
            <Button type="submit" className="h-12 w-full rounded-[1.15rem] font-semibold bg-slate-900 text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]">
              <Filter className="size-4 shrink-0" />
              Apply filters
            </Button>
            <Button asChild variant="outline" className="h-12 w-full rounded-[1.15rem] border border-black/10 bg-black/5 font-semibold text-slate-700 transition-all hover:bg-black/10 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/14">
              <Link href="/explore">Clear filters</Link>
            </Button>
          </div>
        </form>

        <div className="rounded-[1.5rem] border border-black/5 bg-black/[0.03] p-5 transition-colors dark:border-white/10 dark:bg-white/[0.04]">
          <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Live Results
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-slate-900 dark:text-white">{totalCount}</p>
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">matches found</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}