"use client"

import Link from "next/link"
import type { Property } from "@prisma/client"
import { ArrowRight, BedDouble, Bath, MapPin, Ruler } from "lucide-react"

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
    <Card className={cn("group flex h-full flex-col overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/30 rounded-[2.5rem]", className)}>
      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        
        {/* --- IMAGE & BADGE --- */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-sm shrink-0">
          <ListingImage alt={property.title} src={property.images[0]} className="transition-transform duration-700 group-hover:scale-110" />
          
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
          
          <Badge className="absolute top-4 left-4 border-white/20 bg-black/40 backdrop-blur-md text-white px-3 py-1 text-xs font-semibold shadow-sm transition-colors group-hover:bg-primary group-hover:border-primary">
            <span className="relative flex size-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
            </span>
            Available
          </Badge>

          <div className="absolute bottom-4 left-4">
            <p className="text-2xl font-bold text-white drop-shadow-md">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        {/* --- INFO SECTION --- */}
        <div className="flex flex-col flex-1 px-1 pt-1">
          {/* Title & Location */}
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-foreground truncate transition-colors group-hover:text-primary" title={property.title}>
              {property.title}
            </h3>
            <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground truncate" title={property.location}>
              <MapPin className="size-4 text-primary shrink-0" />
              <span className="truncate">{property.location}</span>
            </p>
          </div>

          {/* Stats Grid - Fixed for strictly 1 line */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 pt-4 mt-auto border-t border-border/40">
            
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <BedDouble className="size-4 text-primary shrink-0" />
              <p className="text-[0.8rem] font-bold text-foreground leading-none">
                {property.bedrooms} <span className="font-medium text-muted-foreground ml-0.5">Beds</span>
              </p>
            </div>
            
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="size-4 text-primary shrink-0" />
              <p className="text-[0.8rem] font-bold text-foreground leading-none">
                {property.bathrooms} <span className="font-medium text-muted-foreground ml-0.5">Baths</span>
              </p>
            </div>

            <div className="flex items-center gap-1.5" title={`${property.areaSqFt} Square Feet`}>
              <Ruler className="size-4 text-primary shrink-0" />
              <p className="text-[0.8rem] font-bold text-foreground leading-none">
                {formatArea(property.areaSqFt).replace(" sq ft", "")} <span className="font-medium text-muted-foreground ml-0.5">SqFt</span>
              </p>
            </div>

          </div>
        </div>
      </CardContent>

      {/* --- FOOTER BUTTON --- */}
      <CardFooter className="mt-auto px-5 pb-5 pt-0">
        <Button asChild className="w-full rounded-xl h-12 text-base font-bold shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-0.5 active:scale-95">
          <Link href={`/properties/${property.id}`}>
            View Details
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}