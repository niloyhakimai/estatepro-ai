"use client"

import Link from "next/link"
import { ArrowLeft, Compass, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ExploreEmptyState() {
  return (
    <Card className="overflow-hidden rounded-[2.4rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
      <CardContent className="relative flex flex-col items-center px-6 py-20 text-center sm:px-12 sm:py-24">
        {/* Responsive Radial Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(21,159,149,0.08),transparent_45%)] transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top,rgba(41,194,179,0.15),transparent_45%)]" />

        {/* Icon Container */}
        <span className="relative z-10 mb-2 flex size-24 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_40px_-12px_rgba(21,159,149,0.3)] transition-colors duration-500 dark:bg-primary/20 dark:shadow-[0_0_40px_-12px_rgba(41,194,179,0.55)]">
          <SearchX className="size-10 shrink-0" />
        </span>

        {/* Typography */}
        <h2 className="relative z-10 mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          No properties found
        </h2>

        <p className="relative z-10 mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-white/70 sm:text-lg">
          Try widening your location, adjusting the price range, or changing
          the bedroom count. The filters stay in place so you can keep
          iterating until the right match appears.
        </p>

        {/* Buttons */}
        <div className="relative z-10 mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button 
            asChild 
            size="lg" 
            className="h-12 w-full rounded-[1.15rem] px-8 font-semibold bg-slate-900 text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d] sm:w-auto"
          >
            <Link href="/explore">
              <Compass className="size-5 shrink-0" />
              Clear all filters
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="h-12 w-full rounded-[1.15rem] border border-black/10 bg-black/5 px-8 font-semibold text-slate-700 transition-all hover:bg-black/10 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/14 sm:w-auto"
          >
            <Link href="/">
              <ArrowLeft className="size-5 shrink-0" />
              Back to home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}