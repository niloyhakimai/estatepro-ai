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
    <div className="min-h-screen bg-slate-50/50 pb-24 transition-colors duration-500 dark:bg-black/20">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="space-y-12">
          
          {/* --- TOP HEADER --- */}
          <div className="flex flex-col gap-6">
            <Button 
              asChild 
              variant="ghost" 
              className="w-fit rounded-full px-4 text-slate-600 transition-colors hover:bg-black/5 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Link href="/explore">
                <ChevronLeft className="mr-2 size-4" />
                Back to Explore
              </Link>
            </Button>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge 
                    variant={property.isAvailable ? "default" : "outline"} 
                    className={
                      property.isAvailable 
                        ? "bg-primary/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20" 
                        : "border-black/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:border-white/20 dark:text-white/50"
                    }
                  >
                    {property.isAvailable ? (
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5" /> Available Now</span>
                    ) : "Off Market"}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="border border-black/5 bg-white/60 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/40 dark:text-white/70"
                  >
                    Exclusive Listing
                  </Badge>
                </div>
                <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 drop-shadow-sm transition-colors dark:text-white sm:text-5xl lg:text-[4rem]">
                  {property.title}
                </h1>
                <p className="flex items-center gap-2.5 text-lg font-medium text-slate-600 transition-colors dark:text-white/70">
                  <span className="rounded-full border border-black/5 bg-white/60 p-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/40">
                    <MapPin className="size-4 text-primary" />
                  </span>
                  {property.location}
                </p>
              </div>

              {/* Price Card */}
              <div className="shrink-0 rounded-[2.5rem] border border-black/5 bg-white/60 px-8 py-8 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                  Asking Price
                </p>
                <p className="text-4xl font-black text-slate-900 drop-shadow-sm transition-colors dark:text-white lg:text-[3.2rem]">
                  {formatPrice(property.price)}
                </p>
              </div>
            </div>
          </div>

          {/* --- IMAGE GALLERY --- */}
          <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/40 shadow-[0_38px_110px_-42px_rgba(15,23,42,0.15)] backdrop-blur-md transition-colors duration-500 dark:border-white/10 dark:bg-black/20 dark:shadow-[0_38px_110px_-42px_rgba(0,0,0,0.8)]">
            <PropertyMediaGallery images={property.images} title={property.title} />
          </div>

          {/* --- MAIN CONTENT & SIDEBAR --- */}
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
            
            {/* Left Content Column */}
            <div className="space-y-10">
              
              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  About this property
                </h2>
                <div className="rounded-[2rem] border border-black/5 bg-white/60 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] sm:p-8">
                  <p className="whitespace-pre-wrap text-[1.05rem] leading-[1.8] text-slate-600 dark:text-white/70">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Key Specifications
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { icon: BedDouble, value: property.bedrooms, label: "Bedrooms" },
                    { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
                    { icon: Ruler, value: formatArea(property.areaSqFt), label: "Sq Ft" },
                    { icon: MapPin, value: property.location.split(',')[0], label: "Area" },
                  ].map((stat, i) => (
                    <div key={i} className="group flex flex-col items-center justify-center rounded-[1.75rem] border border-black/5 bg-white/60 p-6 text-center shadow-[0_10px_40px_-20px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] dark:hover:border-white/20 dark:hover:bg-black/60">
                      <div className="mb-4 rounded-2xl border border-black/5 bg-black/5 p-3.5 transition-colors dark:border-white/10 dark:bg-white/5">
                        <stat.icon className="size-6 text-primary transition-transform group-hover:scale-110" />
                      </div>
                      <p className="w-full truncate px-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar Column (Sticky) */}
            <aside className="sticky top-28 space-y-6">
              
              {/* Summary Card */}
              <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
                <CardHeader className="border-b border-black/5 bg-black/[0.02] p-6 transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Property Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-6 text-sm font-medium">
                  {[
                    { label: "Price", value: formatPrice(property.price) },
                    { label: "Bedrooms", value: property.bedrooms },
                    { label: "Bathrooms", value: property.bathrooms },
                    { label: "Area", value: formatArea(property.areaSqFt) },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.03] px-4 py-3.5 transition-colors dark:border-white/10 dark:bg-white/[0.03]">
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">{item.label}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact/Inquiry Card */}
              <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_38px_110px_-42px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_38px_110px_-42px_rgba(0,0,0,0.8)]">
                <CardHeader className="p-8 pb-4">
                  <Badge variant="secondary" className="mb-3 w-fit bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
                    Contact Agent
                  </Badge>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Send an inquiry</CardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                    Ask about showings, financing timing, or move-in expectations. We respond within minutes.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  {session?.user ? (
                    <InquiryForm propertyId={property.id} />
                  ) : (
                    <div className="space-y-6 rounded-[2rem] border border-black/5 bg-black/[0.02] p-8 text-center transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                      <div className="mx-auto inline-flex items-center justify-center rounded-full border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black/60">
                        <MessageSquareMore className="size-7 text-primary" />
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-white/70">
                        Sign in to send a tracked inquiry directly to our elite advisory team.
                      </p>
                      <Button asChild className="h-12 w-full rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]">
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
            <div className="mb-8 flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Similar Properties
              </h2>
              <p className="text-lg font-medium text-slate-600 dark:text-white/70">
                Other luxury listings you may want to compare in this range.
              </p>
            </div>
            
            {relatedProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProperties.map((relatedProperty) => (
                  <PropertyCard key={relatedProperty.id} property={relatedProperty} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-black/10 bg-black/[0.02] p-16 text-center transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mb-6 rounded-full border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black/40">
                  <MapPin className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">No similar properties yet</h3>
                <p className="max-w-md text-base font-medium text-slate-600 dark:text-white/70">
                  More comparable properties will appear here as additional luxury inventory is added to the platform.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}