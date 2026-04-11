/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { ArrowRight, Mail, Star } from "lucide-react"

import { HeroPropertySearch } from "@/components/home/hero-property-search"
import { PropertyCard } from "@/components/explore/property-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import {
  categories,
  faqs,
  homeStats,
  services,
  testimonials,
} from "./home-content"

const sectionShell = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8"
const sectionCard =
  "rounded-[2rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]"

function SectionHeading({
  badge,
  description,
  title,
}: {
  badge: string
  description: string
  title: string
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary dark:bg-primary/20">
        {badge}
      </Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-white/70 sm:text-base sm:leading-8">
          {description}
        </p>
      </div>
    </div>
  )
}

function ReviewsRow() {
  return (
    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" />
      ))}
    </div>
  )
}

async function getFeaturedProperties() {
  try {
    return await prisma.property.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: "desc",
      },
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
  } catch {
    return []
  }
}

async function getAvailableLocations() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        location: "asc",
      },
      select: {
        location: true,
      },
    })

    const seen = new Set<string>()
    const locations: string[] = []

    for (const property of properties) {
      const location = property.location.trim()

      if (!location) {
        continue
      }

      const normalizedLocation = location.toLowerCase()

      if (seen.has(normalizedLocation)) {
        continue
      }

      seen.add(normalizedLocation)
      locations.push(location)
    }

    return locations
  } catch {
    return []
  }
}

export async function HomePage() {
  const [featuredProperties, availableLocations] = await Promise.all([
    getFeaturedProperties(),
    getAvailableLocations(),
  ])
  const leadTestimonial = testimonials[0]
  const supportingTestimonials = testimonials.slice(1)

  return (
    <div className="pb-24 pt-0 sm:pb-28 lg:pb-32 flex flex-col gap-24">
      
      {/* --- REBUILT PREMIUM REAL ESTATE HERO SECTION --- */}
      <section className="relative w-full flex flex-col items-center pt-40 pb-48 lg:pt-52 lg:pb-64 mb-24 lg:mb-32">
        {/* Full-Width Background Image */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
          alt="Premium Property Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlays for legibility */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/10 z-10" /> {/* Subtle overall tint */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

        {/* Hero Typography Content Layer */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Side: Chips & Heading */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-[13px] font-semibold transition shadow-none">
                  HOUSE
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-[13px] font-semibold transition shadow-none">
                  APARTMENT
                </Badge>
                <Badge className="bg-[#1A2624] hover:bg-[#1A2624]/90 text-white border-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[13px] font-semibold transition shadow-none">
                  RESIDENTIAL
                </Badge>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-semibold tracking-tight text-white leading-[1.02]">
                Build Your Future, One <br className="hidden sm:block" /> Property at a Time.
              </h1>
            </div>

            {/* Right Side: Paragraph */}
            <div className="lg:col-span-4 lg:justify-self-end w-full max-w-sm pb-2 lg:pb-3">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium text-left lg:text-right">
                Own Your World, One Property at a Time. Own Your World, One Property at a Time. Own Your World, One Property at a Time. Own Your World, One Property at a Time.
              </p>
            </div>
          </div>
        </div>

        {/* LARGE FLOATING SEARCH/FILTER PANEL */}
        <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <HeroPropertySearch locations={availableLocations} />
          </div>
        </div>
      </section>
      {/* --- END REBUILT HERO SECTION --- */}

      {/* Stats Section */}
      <section className={sectionShell}>
        <div className="overflow-hidden rounded-[1.9rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] mt-8 lg:mt-12">
          <div className="grid divide-y divide-black/5 dark:divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {homeStats.map(({ label, value }) => (
              <div key={label} className="px-6 py-7 sm:px-8">
                <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  {value}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Services Section */}
      <section className={sectionShell}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className={cn(sectionCard, "p-6 sm:p-8")}>
            <div className="flex flex-col gap-6">
              <SectionHeading
                badge="Browse categories"
                title="Image-led entry points into the listings your buyers care about."
                description="Categories keep the homepage expressive while staying anchored to the real filters and property paths already used throughout Explore."
              />

              <div className="grid gap-4 md:grid-cols-2">
                {categories.map(({ count, description, href, icon: Icon, image, title }) => (
                  <Link key={title} href={href} className="group block">
                    <div className="relative min-h-[16rem] overflow-hidden rounded-[1.6rem] border border-black/5 bg-black transition-colors dark:border-white/10">
                      <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/34 to-transparent" />
                      <div className="relative flex h-full flex-col justify-between p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md">
                            <Icon className="size-4 shrink-0" />
                          </span>
                          <Badge className="border-white/10 bg-black/35 text-white">
                            {count}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-white">{title}</h3>
                          <p className="text-sm leading-7 text-white/72">{description}</p>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            Browse now
                            <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className={cn(sectionCard, "p-6 sm:p-7")}>
              <Badge variant="outline" className="w-fit border-black/10 bg-white dark:border-white/10 dark:bg-black">
                Premium services
              </Badge>
              <div className="mt-5 space-y-4">
                {services.map(({ description, icon: Icon, title }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-[1.4rem] border border-black/5 bg-black/[0.02] px-4 py-4 transition-colors dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20">
                      <Icon className="size-5 shrink-0" />
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                      <p className="text-sm leading-7 text-slate-600 dark:text-white/70">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={cn(sectionCard, "overflow-hidden")}>
              <CardContent className="p-0">
                <div className="relative min-h-[18rem]">
                  <img
                    src={categories[1].image}
                    alt={categories[1].title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(4,9,14,0.9),rgba(4,9,14,0.5),rgba(4,9,14,0.2))]" />
                  <div className="relative flex h-full flex-col justify-end gap-3 p-6">
                    <Badge className="w-fit border-white/15 bg-white/10 text-white">
                      Curated discovery
                    </Badge>
                    <h3 className="text-2xl font-semibold text-white">
                      High-contrast surfaces. Cleaner decisions. Stronger listing focus.
                    </h3>
                    <p className="text-sm leading-7 text-white/74">
                      Move from homepage inspiration to live Explore results without the
                      interface changing language underneath you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className={sectionShell}>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              badge="Featured properties"
              title="Live listings pulled directly from your available inventory."
              description="Cards stay premium and compact while preserving the same property routes and data used throughout the rest of the product."
            />
            <Button asChild variant="outline" className="h-11 rounded-[1rem] border-black/10 px-5 font-semibold dark:border-white/10">
              <Link href="/explore">
                Open Explore
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </Button>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <Card className={cn(sectionCard, "border-dashed border-2")}>
              <CardContent className="flex flex-col items-center gap-5 p-10 text-center sm:p-14">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Add properties to bring this showcase to life.
                  </h3>
                  <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/70 sm:text-base">
                    Once properties exist in the database, the homepage will surface the
                    latest four available listings here automatically.
                  </p>
                </div>
                <Button asChild className="h-11 rounded-[1rem] px-5 font-semibold">
                  <Link href="/explore">
                    Go to Explore
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Testimonials & FAQ Section */}
      <section className={sectionShell}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
          <div className={cn(sectionCard, "p-6 sm:p-8")}>
            <SectionHeading
              badge="Testimonials"
              title="Clients remember the clarity as much as the outcome."
              description="A premium dark interface only works when the human support behind it feels equally composed and trustworthy."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Card className="overflow-hidden border-black/5 bg-black/[0.02] shadow-none transition-colors dark:border-white/10 dark:bg-white/[0.03]">
                <div className="relative min-h-[16rem]">
                  <img
                    src={leadTestimonial.avatar}
                    alt={leadTestimonial.name}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/42 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end gap-3 p-6">
                    <Badge className="w-fit border-white/15 bg-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-white">
                      {leadTestimonial.role}
                    </Badge>
                    <ReviewsRow />
                    <p className="text-lg leading-8 text-white">
                      &quot;{leadTestimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <Avatar>
                        <AvatarImage src={leadTestimonial.avatar} alt={leadTestimonial.name} />
                        <AvatarFallback className="bg-primary/14 font-semibold text-primary">
                          {leadTestimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white">{leadTestimonial.name}</p>
                        <p className="text-sm text-white/68">{leadTestimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-5">
                {supportingTestimonials.map(({ avatar, initials, name, quote, role }) => (
                  <Card key={name} className="border-black/5 bg-black/[0.02] shadow-none transition-colors dark:border-white/10 dark:bg-white/[0.03]">
                    <CardContent className="space-y-4 p-5">
                      <ReviewsRow />
                      <p className="text-sm leading-7 text-slate-700 dark:text-white/80">
                        &quot;{quote}&quot;
                      </p>
                      <div className="flex items-center gap-3 border-t border-black/5 pt-4 transition-colors dark:border-white/10">
                        <Avatar>
                          <AvatarImage src={avatar} alt={name} />
                          <AvatarFallback className="bg-primary/10 font-semibold text-primary dark:bg-primary/20">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
                          <p className="text-sm text-slate-600 dark:text-white/60">{role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Card className={cn(sectionCard, "p-6 sm:p-8")}>
            <SectionHeading
              badge="FAQ"
              title="Practical answers without breaking the premium flow."
              description="The page keeps the tone concise while still giving buyers enough confidence to keep moving."
            />

            <div className="mt-8 rounded-[1.5rem] border border-black/5 bg-black/[0.02] p-2 transition-colors dark:border-white/10 dark:bg-white/[0.03] sm:p-3">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map(({ answer, question }) => (
                  <AccordionItem
                    key={question}
                    value={question}
                    className="border-black/5 px-3 transition-colors dark:border-white/10 sm:px-4"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-slate-900 hover:text-primary dark:text-white dark:hover:text-primary">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-slate-600 dark:text-white/70">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={sectionShell}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="relative overflow-hidden rounded-[2.3rem] border border-black/5 bg-black shadow-[0_34px_110px_-62px_rgba(15,23,42,0.5)] transition-colors dark:border-white/10 dark:shadow-[0_34px_110px_-62px_rgba(2,10,20,0.98)]">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
              alt="Elegant residence interior"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,9,14,0.92),rgba(4,9,14,0.62),rgba(4,9,14,0.28))]" />
            <div className="relative flex h-full flex-col justify-between gap-8 p-8 sm:p-10 lg:min-h-[24rem]">
              <div className="space-y-4">
                <Badge className="border-white/15 bg-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-white">
                  Premium dark-system restoration
                </Badge>
                <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
                  Ready to explore listings through a sharper, darker interface?
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                  Open Explore, compare live listings, and move directly into advisor
                  contact when the right property appears.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-[1rem] px-6 font-semibold bg-[#159f95] text-white hover:bg-[#11827a] dark:bg-[#29c2b3] dark:text-black dark:hover:bg-[#22a194]">
                  <Link href="/explore">
                    Start exploring
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-[1rem] border-white/15 bg-white/10 px-6 font-semibold text-white hover:bg-white/14 hover:text-white"
                >
                  <Link href="/contact">Talk to an advisor</Link>
                </Button>
              </div>
            </div>
          </div>

          <Card className={cn(sectionCard, "p-6 sm:p-8")}>
            <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-[0.65rem] uppercase tracking-[0.2em] text-primary dark:bg-primary/20">
              Stay connected
            </Badge>
            <div className="mt-4 space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Subscribe for listing alerts, price updates, and market notes.
              </h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-white/70 sm:text-base">
                Receive concise updates that help serious buyers stay ready without
                drowning in noise.
              </p>
            </div>

            <form
              action="mailto:hello@estatepro.com?subject=Subscribe%20for%20latest%20listings"
              method="post"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="newsletter-email"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
                >
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 rounded-[1rem] border-black/10 bg-black/5 text-slate-900 placeholder:text-slate-500 focus-visible:border-black/20 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/20 dark:focus-visible:ring-white/20"
                />
              </div>
              <Button type="submit" className="h-12 w-full rounded-[1rem] font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#b8f579] dark:text-black dark:hover:bg-[#a6e55d]">
                <Mail className="size-4 shrink-0" />
                Subscribe now
              </Button>
              <p className="text-center text-xs text-slate-500 dark:text-white/50">
                Opens your email client instantly.
              </p>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}