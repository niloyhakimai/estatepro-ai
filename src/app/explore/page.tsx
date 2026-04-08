import { MapPin, Search, CheckCircle2 } from "lucide-react"

import { AiSearchForm } from "@/components/ai/ai-search-form"
import { ExploreEmptyState } from "@/components/explore/explore-empty-state"
import { ExploreFiltersPanel } from "@/components/explore/explore-filters"
import { ExplorePagination } from "@/components/explore/explore-pagination"
import {
  buildPropertyOrderBy,
  buildPropertyWhereInput,
  normalizeExploreFilters,
  sortOptions,
} from "@/components/explore/explore-utils"
import { PropertyCard } from "@/components/explore/property-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 8

type ExplorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? ""
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams
  const filters = normalizeExploreFilters(params)
  const requestedPage = Math.max(
    1,
    Number.parseInt(getStringParam(params.page) || "1", 10) || 1
  )
  const where = buildPropertyWhereInput(filters)

  const totalCount = await prisma.property.count({
    where,
  })

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)

  const properties = await prisma.property.findMany({
    where,
    orderBy: buildPropertyOrderBy(filters.sort),
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      areaSqFt: true,
      bathrooms: true,
      bedrooms: true,
      id: true,
      images: true,
      location: true,
      price: true,
      title: true,
    },
  })

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = totalCount === 0 ? 0 : rangeStart + properties.length - 1

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 animate-in fade-in duration-500">
      <div className="space-y-12">
        
        {/* --- TOP HERO PANE (CLEAN, NO IMAGE) --- */}
        <div className="rounded-[3rem] border border-border/30 bg-background/60 backdrop-blur-xl p-10 sm:p-14 shadow-2xl space-y-10">
          <div className="space-y-4">
            <Badge variant="accent" className="bg-primary/10 text-primary border-primary/20 py-1.5 px-4 shadow-sm">Explore Exclusive Listings</Badge>
            <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
                  Browse modern real estate <span className="text-primary">faster</span> and cleaner.
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Search our verified, elite inventory by location, price, and bedrooms. EstatePro keeps your search streamlined, transparent, and effortlessly shareable through URL-based filters.
                </p>
              </div>

              {/* LIVE RESULTS BOX - PREMIUMcontained style */}
              <div className="shrink-0 rounded-[2rem] border border-border/40 bg-background/80 p-8 shadow-xl backdrop-blur-md transition-all hover:shadow-2xl hover:border-primary/20">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <span className="relative flex size-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2.5 bg-primary"></span>
                  </span>
                  LIVE INVENTORY STATUS
                </p>
                <p className="mt-3 text-5xl font-extrabold text-foreground drop-shadow-sm">
                  {totalCount}
                </p>
                <p className="mt-3 flex items-center gap-2.5 text-base font-medium text-muted-foreground">
                  <MapPin className="size-5 text-primary" />
                  Matching verified listings
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-background/40 border border-border/40 p-2 backdrop-blur-md shadow-inner mt-4">
            <AiSearchForm
              compact
              className="bg-card shadow-none border-none"
              description="✨ Pro Tip: Type 'Find me a cheap 3-bedroom place in Austin' and our AI will configure the Explore filters instantly."
            />
          </div>
        </div>

        {/* --- MAIN EXPLORE AREA --- */}
        <div className="grid gap-8 xl:grid-cols-[20rem_minmax(0,1fr)] items-start pt-6">
          <ExploreFiltersPanel filters={filters} totalCount={totalCount} />

          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-3xl border border-border/40 bg-secondary/30 p-6 shadow-sm">
              <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-5 py-3.5 text-sm font-medium text-muted-foreground backdrop-blur-sm border border-border/50">
                <Search className="size-5 text-primary" />
                Live Results: URL-based filters stay shareable and bookmarked.
              </div>

              <form action="/explore" className="flex flex-col gap-3 sm:flex-row">
                <input type="hidden" name="location" value={filters.location} />
                <input type="hidden" name="price" value={filters.price} />
                <input type="hidden" name="bedrooms" value={filters.bedrooms} />
                <Select
                  name="sort"
                  defaultValue={filters.sort}
                  className="min-w-[16rem] h-12 rounded-xl bg-background/60 border-border/60"
                  aria-label="Sort properties"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Button type="submit" variant="default" className="rounded-xl h-12 text-base h-font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  Sort results
                </Button>
              </form>
            </div>

            {properties.length === 0 ? (
              <ExploreEmptyState />
            ) : (
              <div className="space-y-10 pt-4">
                <div className="inline-block rounded-2xl border border-border/40 bg-background/60 px-6 py-3.5 text-base font-medium text-muted-foreground backdrop-blur-sm">
                  Showing <span className="text-foreground font-bold">{rangeStart}-{rangeEnd}</span> of <span className="text-foreground font-bold">{totalCount}</span> luxury matching properties.
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                <ExplorePagination
                  filters={filters}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}