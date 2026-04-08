import Link from "next/link"
import {
  Bath,
  BedDouble,
  ChevronLeft,
  MapPin,
  MessageSquareMore,
  Ruler,
  CheckCircle2
} from "lucide-react"
import { notFound } from "next/navigation"

import { getAuthSession } from "@/app/api/auth/[...nextauth]/auth-options"
import { InquiryForm } from "@/components/explore/inquiry-form"
import { PropertyCard } from "@/components/explore/property-card"
import { PropertyMediaGallery } from "@/components/explore/property-media-gallery"
import { formatArea, formatPrice } from "@/components/explore/explore-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

type PropertyDetailsPageContentProps = {
  callbackPath: string
  propertyId: string
}

function buildLoginHref(callbackPath: string) {
  return `/login?callbackUrl=${encodeURIComponent(callbackPath)}`
}

async function getRelatedProperties(propertyId: string, location: string, price: number) {
  const relatedProperties = await prisma.property.findMany({
    where: {
      id: { not: propertyId },
      isAvailable: true,
      OR: [
        { location: { equals: location, mode: "insensitive" } },
        {
          price: {
            gte: price * 0.75,
            lte: price * 1.25,
          },
        },
      ],
    },
    orderBy: [{ createdAt: "desc" }],
    take: 4,
    select: {
      areaSqFt: true,
      bathrooms: true,
      bedrooms: true,
      id: true,
      images: true,
      location: true,
      price: true,
      title: true,
    },
  })

  if (relatedProperties.length > 0) {
    return relatedProperties
  }

  return prisma.property.findMany({
    where: {
      id: { not: propertyId },
      isAvailable: true,
    },
    orderBy: [{ createdAt: "desc" }],
    take: 4,
    select: {
      areaSqFt: true,
      bathrooms: true,
      bedrooms: true,
      id: true,
      images: true,
      location: true,
      price: true,
      title: true,
    },
  })
}

export async function PropertyDetailsPageContent({
  callbackPath,
  propertyId,
}: PropertyDetailsPageContentProps) {
  const [property, session] = await Promise.all([
    prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        areaSqFt: true,
        bathrooms: true,
        bedrooms: true,
        description: true,
        id: true,
        images: true,
        isAvailable: true,
        location: true,
        price: true,
        title: true,
      },
    }),
    getAuthSession(),
  ])

  if (!property) {
    notFound()
  }

  const relatedProperties = await getRelatedProperties(
    property.id,
    property.location,
    property.price
  )

  const signInHref = buildLoginHref(callbackPath)

  return (
    <div className="min-h-screen bg-background/50 pb-24">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="space-y-10">
          
          {/* --- TOP HEADER --- */}
          <div className="flex flex-col gap-6">
            <Button asChild variant="ghost" className="w-fit rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <Link href="/explore">
                <ChevronLeft className="mr-2 size-4" />
                Back to Explore
              </Link>
            </Button>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant={property.isAvailable ? "default" : "outline"} className={property.isAvailable ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-sm py-1 px-3 shadow-sm" : "text-sm py-1 px-3"}>
                    {property.isAvailable ? (
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5" /> Available Now</span>
                    ) : "Off Market"}
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/50 backdrop-blur-sm text-sm py-1 px-3">Exclusive Listing</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
                  {property.title}
                </h1>
                <p className="flex items-center gap-2 text-lg text-muted-foreground font-medium">
                  <span className="p-1.5 rounded-full bg-primary/10"><MapPin className="size-5 text-primary" /></span>
                  {property.location}
                </p>
              </div>

              {/* Price Card */}
              <div className="shrink-0 rounded-[2rem] border border-border/50 bg-gradient-to-br from-background/80 to-secondary/30 px-8 py-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Asking Price
                </p>
                <p className="text-4xl font-bold text-primary lg:text-5xl drop-shadow-sm">
                  {formatPrice(property.price)}
                </p>
              </div>
            </div>
          </div>

          {/* --- IMAGE GALLERY --- */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/20">
            <PropertyMediaGallery images={property.images} title={property.title} />
          </div>

          {/* --- MAIN CONTENT & SIDEBAR --- */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] items-start">
            
            {/* Left Content Column */}
            <div className="space-y-10">
              
              {/* Description */}
              <Card className="border-border/40 shadow-lg bg-background/60 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-secondary/20 pb-4 border-b border-border/30">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    About this property
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card className="border-border/40 shadow-lg bg-background/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold">Key Specifications</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="flex flex-col items-center justify-center text-center rounded-[2rem] border border-border/50 bg-background/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                    <div className="rounded-2xl bg-primary/10 p-3 mb-3">
                      <BedDouble className="size-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      {property.bedrooms}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center rounded-[2rem] border border-border/50 bg-background/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                    <div className="rounded-2xl bg-primary/10 p-3 mb-3">
                      <Bath className="size-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      {property.bathrooms}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center rounded-[2rem] border border-border/50 bg-background/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                    <div className="rounded-2xl bg-primary/10 p-3 mb-3">
                      <Ruler className="size-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      {formatArea(property.areaSqFt)}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Sq Ft</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center rounded-[2rem] border border-border/50 bg-background/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                    <div className="rounded-2xl bg-primary/10 p-3 mb-3">
                      <MapPin className="size-6 text-primary" />
                    </div>
                    <p className="text-xl font-bold text-foreground truncate w-full px-2" title={property.location}>
                      {property.location}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Location</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar Column (Sticky) */}
            <aside className="space-y-6 sticky top-28">
              
              {/* Summary Card */}
              <Card className="border-border/40 shadow-xl bg-background/80 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">Property Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3">
                    <span>Price</span>
                    <span className="font-bold text-foreground text-base">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3">
                    <span>Bedrooms</span>
                    <span className="font-bold text-foreground text-base">
                      {property.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3">
                    <span>Bathrooms</span>
                    <span className="font-bold text-foreground text-base">
                      {property.bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3">
                    <span>Area</span>
                    <span className="font-bold text-foreground text-base">
                      {formatArea(property.areaSqFt)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact/Inquiry Card */}
              <Card className="border-primary/20 shadow-xl bg-gradient-to-b from-primary/5 to-background backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <Badge variant="default" className="w-fit mb-3 bg-primary text-primary-foreground">Contact Agent</Badge>
                  <CardTitle className="text-2xl font-bold">Send an inquiry</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground mt-2">
                    Ask about showings, financing timing, or move-in expectations. We respond within minutes.
                  </p>
                </CardHeader>
                <CardContent>
                  {session?.user ? (
                    <InquiryForm propertyId={property.id} />
                  ) : (
                    <div className="space-y-5 rounded-[1.5rem] border border-border/60 bg-background/90 p-6 text-center shadow-sm">
                      <div className="inline-flex rounded-full bg-primary/10 p-3 mb-2">
                        <MessageSquareMore className="size-6 text-primary" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground font-medium">
                        Sign in to send a tracked inquiry directly to our advisory team.
                      </p>
                      <Button asChild className="w-full rounded-xl h-12 text-base font-bold shadow-md transition-transform hover:-translate-y-0.5">
                        <Link href={signInHref}>
                          Sign in to inquire
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* --- RELATED PROPERTIES --- */}
          <div className="pt-10">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Similar Properties
              </h2>
              <p className="text-muted-foreground text-lg">Other listings you may want to compare in this range.</p>
            </div>
            
            {relatedProperties.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {relatedProperties.map((relatedProperty) => (
                  <PropertyCard key={relatedProperty.id} property={relatedProperty} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-border/60 bg-background/50 p-12 text-center">
                <div className="rounded-full bg-secondary/50 p-4 mb-4">
                  <MapPin className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No similar properties yet</h3>
                <p className="text-base text-muted-foreground max-w-md">
                  More comparable properties will appear here as additional inventory is added to the platform.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}