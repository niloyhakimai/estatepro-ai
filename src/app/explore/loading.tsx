import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PropertyCardSkeleton } from "@/components/explore/property-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExploreLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 transition-colors duration-500 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        
        {/* --- HEADER SKELETON --- */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-36 rounded-full" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4 w-full">
              <Skeleton className="h-14 w-full max-w-2xl rounded-[1.15rem]" />
              <Skeleton className="h-5 w-full max-w-3xl rounded-[1.15rem]" />
              <Skeleton className="h-5 w-full max-w-xl rounded-[1.15rem]" />
            </div>
            {/* Stats Card Skeleton matching the real UI */}
            <Skeleton className="h-32 w-full shrink-0 rounded-[2.5rem] lg:w-72" />
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid gap-8 xl:grid-cols-[20rem_minmax(0,1fr)]">
          
          {/* Sidebar Filters Skeleton */}
          <Card className="h-fit overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
            <CardHeader className="space-y-4 p-8">
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-8 w-40 rounded-[1.15rem]" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-5 px-8 pb-8">
              <Skeleton className="h-12 w-full rounded-[1.15rem]" />
              <Skeleton className="h-12 w-full rounded-[1.15rem]" />
              <Skeleton className="h-12 w-full rounded-[1.15rem]" />
              <Skeleton className="h-12 w-full rounded-[1.15rem]" />
              <Skeleton className="h-12 w-full rounded-[1.15rem]" />
              <Skeleton className="h-32 w-full rounded-[1.55rem]" />
            </CardContent>
          </Card>

          {/* Properties Grid Skeleton */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar Skeleton */}
              <Skeleton className="h-14 w-full rounded-full sm:max-w-md" />
              {/* Sort/Pagination Skeleton */}
              <Skeleton className="h-12 w-full rounded-[1.15rem] sm:w-40" />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}