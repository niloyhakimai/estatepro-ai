"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <CardContent className="flex flex-1 flex-col gap-5 p-4">
        {/* Image Placeholder - Matching aspect-[1.08] */}
        <Skeleton className="aspect-[1.08] w-full rounded-[1.45rem] bg-black/5 dark:bg-white/5" />

        <div className="flex flex-1 flex-col gap-4 px-1">
          {/* Title & Location Placeholder */}
          <div className="space-y-3 pt-1">
            <Skeleton className="h-6 w-4/5 rounded-md bg-black/5 dark:bg-white/5" />
            <Skeleton className="h-4 w-1/2 rounded-md bg-black/5 dark:bg-white/5" />
          </div>

          {/* Metrics Grid Placeholder */}
          <div className="mt-auto grid grid-cols-3 gap-3">
            <Skeleton className="h-[5.5rem] w-full rounded-[1.15rem] bg-black/5 dark:bg-white/5" />
            <Skeleton className="h-[5.5rem] w-full rounded-[1.15rem] bg-black/5 dark:bg-white/5" />
            <Skeleton className="h-[5.5rem] w-full rounded-[1.15rem] bg-black/5 dark:bg-white/5" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto px-5 pb-5 pt-0">
        {/* Button Placeholder */}
        <Skeleton className="h-12 w-full rounded-[1.15rem] bg-black/5 dark:bg-white/5" />
      </CardFooter>
    </Card>
  )
}