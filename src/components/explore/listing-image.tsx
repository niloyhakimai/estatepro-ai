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
          "relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary/20",
          className
        )}
      >
        {/* Premium placeholder background */}
        <div className="absolute inset-0 opacity-20 grayscale">
           <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
            alt="Placeholder background"
            className="h-full w-full object-cover blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-lg ring-1 ring-border/50 backdrop-blur-md">
            <Building2 className="size-6" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground drop-shadow-sm">EstatePro</p>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Premium Media</p>
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