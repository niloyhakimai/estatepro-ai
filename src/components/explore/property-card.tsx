"use client"

import Link from "next/link"
import type { Property } from "@prisma/client"
import { ArrowRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react"

import { formatArea, formatPrice } from "@/components/explore/explore-utils"
import { ListingImage } from "@/components/explore/listing-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type PropertyCardData = Pick<
  Property,
  "areaSqFt" | "bathrooms" | "bedrooms" | "id" | "images" | "location" | "price" | "title"
>

type PropertyCardProps = {
  className?: string
  property: PropertyCardData
}

export function PropertyCard({ className, property }: PropertyCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-black/10 hover:bg-white/80 hover:shadow-[0_40px_100px_-50px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] dark:hover:border-white/20 dark:hover:bg-card/60 dark:hover:shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <CardContent className="flex flex-1 flex-col p-4">
        {/* IMAGE SECTION */}
        <div className="relative aspect-[1.1] overflow-hidden rounded-[1.45rem]">
          <ListingImage
            alt={property.title}
            src={property.images[0]}
            className="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <Badge className="border-white/15 bg-black/40 text-white shadow-sm backdrop-blur-md">
              Available
            </Badge>
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur-md">
              Live
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="drop-shadow-md text-2xl font-bold tracking-tight text-white">
              {formatPrice(property.price)}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white/90">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span className="truncate drop-shadow-sm">{property.location}</span>
            </p>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
          <h3 className="line-clamp-2 text-[1.15rem] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-white">
            {property.title}
          </h3>

          {/* ULTRA-CLEAN INLINE METRICS */}
          <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 dark:text-white/70">
            <div className="flex items-center gap-1.5">
              <BedDouble className="size-4 shrink-0 text-primary" />
              <span className="font-bold text-slate-900 dark:text-white">{property.bedrooms}</span>
              <span>Beds</span>
            </div>
            
            <span className="size-1 rounded-full bg-black/15 dark:bg-white/20" />
            
            <div className="flex items-center gap-1.5">
              <Bath className="size-4 shrink-0 text-primary" />
              <span className="font-bold text-slate-900 dark:text-white">{property.bathrooms}</span>
              <span>Baths</span>
            </div>
            
            <span className="size-1 rounded-full bg-black/15 dark:bg-white/20" />
            
            <div className="flex items-center gap-1.5">
              <Ruler className="size-4 shrink-0 text-primary" />
              <span className="font-bold text-slate-900 dark:text-white">{formatArea(property.areaSqFt).replace(" sq ft", "")}</span>
              <span>Sq Ft</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto px-5 pb-5 pt-0">
        <Button 
          asChild 
          className="h-12 w-full rounded-[1.15rem] border border-black/5 bg-black/[0.03] font-bold text-slate-900 shadow-none transition-all duration-300 hover:border-black/15 hover:bg-black/5 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-primary"
        >
          <Link href={`/properties/${property.id}`}>
            View Details
            <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}