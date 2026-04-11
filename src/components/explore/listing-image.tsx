"use client"

import * as React from "react"
import { Building2 } from "lucide-react"

import { cn } from "@/lib/utils"

type ListingImageProps = {
  alt: string
  className?: string
  src?: string | null
}

export function ListingImage({ alt, className, src }: ListingImageProps) {
  const [imageFailed, setImageFailed] = React.useState(!src)

  React.useEffect(() => {
    setImageFailed(!src)
  }, [src])

  if (imageFailed) {
    return (
      <div
        aria-label={alt}
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden bg-black/5 transition-colors duration-500 dark:bg-white/5",
          className
        )}
      >
        {/* Premium placeholder background */}
        <div className="absolute inset-0 opacity-30 grayscale transition-opacity duration-500 dark:opacity-20">
           <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
            alt="Placeholder background"
            className="h-full w-full object-cover blur-md"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-md transition-colors duration-500 dark:from-black/90 dark:to-black/40" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-black/10 bg-white/60 text-primary shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-2xl">
            <Building2 className="size-6" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900 drop-shadow-sm transition-colors duration-500 dark:text-white">EstatePro</p>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors duration-500 dark:text-white/60">Premium Media</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        // Plain img keeps this phase resilient while property image hosts remain unknown.
        src={src ?? ""}
        alt={alt}
        className={cn("h-full w-full object-cover transition-transform duration-700 hover:scale-105", className)}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    </>
  )
}