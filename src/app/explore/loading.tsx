import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PropertyCardSkeleton } from "@/components/explore/property-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExploreLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-7 w-36 rounded-full" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-12 w-full max-w-2xl" />
              <Skeleton className="h-5 w-full max-w-3xl" />
              <Skeleton className="h-5 w-full max-w-xl" />
            </div>
            <Skeleton className="h-28 w-full max-w-xs rounded-[1.65rem]" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <Card>
            <CardHeader className="space-y-4">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full rounded-2xl" />
              <Skeleton className="h-11 w-full rounded-2xl" />
              <Skeleton className="h-28 w-full rounded-[1.55rem]" />
            </CardContent>
          </Card>

          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Skeleton className="h-12 w-full rounded-[1.6rem] sm:max-w-sm" />
              <Skeleton className="h-11 w-full rounded-2xl sm:max-w-xs" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
