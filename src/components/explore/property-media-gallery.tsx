import { Camera, ImageIcon, Images } from "lucide-react"

import { ListingImage } from "@/components/explore/listing-image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PropertyMediaGalleryProps = {
  images: string[]
  title: string
}

export function PropertyMediaGallery({
  images,
  title,
}: PropertyMediaGalleryProps) {
  const heroImage = images[0] ?? null
  const spotlightImages = Array.from({ length: 2 }, (_, index) => images[index + 1] ?? null)
  const thumbnailImages = images.length > 0 ? images.slice(0, 5) : [null]

  return (
    <section className="space-y-4 p-2">
      {/* --- TOP GALLERY GRID (BENTO STYLE) --- */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
        
        {/* Main Hero Image */}
        <div className="group relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-border/20 shadow-sm sm:min-h-[30rem] lg:min-h-full">
          <ListingImage 
            alt={`${title} hero image`} 
            src={heroImage} 
            className="transition-transform duration-700 group-hover:scale-105" 
          />
          {/* Deep gradient overlay for text readability */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
            <div className="space-y-3">
              <Badge className="border-white/20 bg-black/40 text-white backdrop-blur-md px-3 py-1 shadow-lg">
                <Images className="mr-1.5 size-3" />
                Featured Media
              </Badge>
              <p className="text-2xl font-bold text-white sm:text-3xl drop-shadow-md leading-tight">
                {title}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 rounded-2xl border border-white/20 bg-black/40 px-4 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/60 cursor-default">
              <Camera className="size-4" />
              {images.length || 0} Photos
            </div>
          </div>
        </div>

        {/* Right Side Spotlight Images */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {spotlightImages.map((image, index) => (
            <div
              key={`${title}-${index + 1}`}
              className="group relative min-h-[14rem] overflow-hidden rounded-[2rem] border border-border/20 shadow-sm"
            >
              <ListingImage 
                alt={`${title} gallery image ${index + 2}`} 
                src={image} 
                className="transition-transform duration-700 group-hover:scale-105"
              />
              {/* Fallback Overlay if no image is present */}
              {!image ? (
                <div className="absolute inset-x-4 bottom-4 rounded-[1.2rem] border border-border/40 bg-background/60 p-4 backdrop-blur-md shadow-sm">
                  <p className="flex items-center gap-3 text-sm font-semibold text-foreground">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ImageIcon className="size-4" />
                    </span>
                    More media coming soon
                  </p>
                </div>
              ) : (
                 <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM THUMBNAILS --- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5 pt-2">
        {thumbnailImages.map((image, index) => (
          <div
            key={`${title}-thumbnail-${index}`}
            className={cn(
              "group relative min-h-[7rem] overflow-hidden rounded-[1.2rem] border border-border/20 shadow-sm cursor-pointer",
              "transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-2 hover:ring-primary/50"
            )}
          >
            <ListingImage 
              alt={`${title} thumbnail ${index + 1}`} 
              src={image} 
              className="transition-transform duration-500 group-hover:scale-110"
            />
            {/* Subtle overlay for unhovered thumbnails */}
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/0" />
          </div>
        ))}
      </div>
    </section>
  )
}