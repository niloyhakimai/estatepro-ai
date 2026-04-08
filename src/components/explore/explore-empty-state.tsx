import Link from "next/link"
import { ArrowLeft, Compass, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ExploreEmptyState() {
  return (
    <Card className="overflow-hidden border-border/50 bg-background/60 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/30 rounded-[2.5rem]">
      <CardContent className="flex flex-col items-center px-6 py-24 text-center sm:px-12 relative">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <span className="relative z-10 flex size-24 items-center justify-center rounded-[2rem] bg-primary/10 text-primary shadow-[0_0_40px_-10px_rgba(15,118,110,0.4)] ring-1 ring-primary/20 mb-2 transition-transform duration-500 hover:scale-105 hover:rotate-3">
          <SearchX className="size-10" />
        </span>
        
        <h2 className="relative z-10 mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          No properties found
        </h2>
        
        <p className="relative z-10 mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Try widening your location, adjusting the price range, or changing
          the bedroom count. The filters stay in place so you can easily iterate until the perfect match appears.
        </p>
        
        <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
          <Button asChild size="lg" className="rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 w-full sm:w-auto h-12 px-8 text-base">
            <Link href="/explore">
              <Compass className="mr-2 size-5" />
              Clear all filters
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl border-border/60 bg-background/50 backdrop-blur-sm transition-transform hover:-translate-y-0.5 w-full sm:w-auto h-12 px-8 text-base">
            <Link href="/">
              <ArrowLeft className="mr-2 size-5" />
              Back to home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}