import { MapPin, Search } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { prisma } from "@/lib/prisma"

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
    <section className="w-full animate-in fade-in duration-500">
      
      {/* --- FULL WIDTH HEADER SECTION --- */}
      <div className="w-full border-b border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-center">
            <div className="space-y-5">
              <Badge variant="secondary" className="bg-primary/10 text-[0.65rem] uppercase tracking-[0.2em] text-primary dark:bg-primary/20">
                Explore exclusive listings
              </Badge>

              <div className="space-y-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
                  Verified inventory. Sharper filtering. Premium continuity.
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.85rem] lg:leading-[1.04]">
                  Browse modern real estate with a focused search flow.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-white/70 sm:text-lg">
                  Search verified inventory by location, price, and bedrooms. Every
                  filter stays reflected in the URL so results remain easy to share,
                  revisit, and refine.
                </p>
              </div>

              <div className="rounded-[1.9rem] border border-black/5 bg-black/5 p-2 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/[0.05]">
                <AiSearchForm
                  compact
                  className="border-none bg-transparent shadow-none"
                  description="Pro tip: type 'Find me a cheap 3-bedroom place in Austin' and let the AI configure the filters."
                />
              </div>
            </div>

            {/* Stats Box */}
            <div className="rounded-[2rem] border border-black/5 bg-white/40 p-6 shadow-sm backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/[0.02] dark:shadow-2xl">
              <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                </span>
                Live inventory
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {totalCount}
              </p>
              <p className="mt-4 flex items-center gap-2.5 text-sm text-slate-600 dark:text-white/70">
                <MapPin className="size-4 shrink-0 text-primary" />
                Matching verified listings
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-[1.15rem] border border-black/5 bg-black/[0.03] px-4 py-3 transition-colors dark:border-white/5 dark:bg-black/40">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                    Current range
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                    Showing {rangeStart}-{rangeEnd} of {totalCount}
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-black/5 bg-black/[0.03] px-4 py-3 transition-colors dark:border-white/5 dark:bg-black/40">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                    Sort mode
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                    {sortOptions.find((option) => option.value === filters.sort)?.label ??
                      "Newest first"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- END FULL WIDTH HEADER --- */}

      {/* Main Content Grid (Filters & Results) */}
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid items-start gap-8 xl:grid-cols-[20rem_minmax(0,1fr)]">
          <ExploreFiltersPanel filters={filters} totalCount={totalCount} />

          <div className="space-y-6">
            
            {/* Sort Bar */}
            <div className="flex flex-col gap-4 rounded-[1.9rem] border border-black/5 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-xl lg:flex-row lg:items-center lg:justify-between sm:p-6">
              <div className="flex items-center gap-3 rounded-full border border-black/5 bg-black/5 px-4 py-3 text-sm text-slate-600 transition-colors dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <Search className="size-4 shrink-0" />
                </span>
                URL-based filters stay shareable and easy to revisit.
              </div>

              <form action="/explore" className="flex flex-col gap-3 sm:flex-row">
                <input type="hidden" name="location" value={filters.location} />
                <input type="hidden" name="price" value={filters.price} />
                <input type="hidden" name="bedrooms" value={filters.bedrooms} />
                <Select
                  name="sort"
                  defaultValue={filters.sort}
                >
                  <SelectTrigger
                    aria-label="Sort properties"
                    className="h-12 min-w-[16rem] rounded-[1rem] bg-white dark:bg-transparent"
                  >
                    <SelectValue placeholder="Sort properties" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" className="h-12 rounded-[1rem] px-5 font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]">
                  Sort results
                </Button>
              </form>
            </div>

            {properties.length === 0 ? (
              <ExploreEmptyState />
            ) : (
              <div className="space-y-8">
                
                {/* Result Info Pill */}
                <div className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/60 px-5 py-3 text-sm text-slate-600 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <MapPin className="size-4 shrink-0" />
                  </span>
                  Showing <span className="font-semibold text-slate-900 dark:text-white">{rangeStart}-{rangeEnd}</span> of{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">{totalCount}</span> matching
                  properties
                </div>

                {/* Properties Grid */}
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