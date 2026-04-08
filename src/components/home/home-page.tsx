import Link from "next/link"
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Search,
  Star,
  Home as HomeIcon,
} from "lucide-react"

import { AiSearchForm } from "@/components/ai/ai-search-form"
import { PropertyCard } from "@/components/explore/property-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

import { categories, faqs, homeStats, services, testimonials } from "./home-content"

const sectionShell = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
const panelClass =
  "rounded-[1.9rem] border border-border/70 bg-card/80 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.65)] backdrop-blur-sm"

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
    <div className="max-w-3xl space-y-3">
      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{badge}</Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  )
}

function ReviewsRow() {
  return (
    <div className="flex items-center gap-1 text-amber-500">
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

export async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  return (
    <div className="pb-20 sm:pb-24">
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <section className="relative flex min-h-[85vh] items-center pb-20 pt-16 lg:min-h-[90vh] lg:pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
            alt="Luxury modern home exterior"
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient Overlay: Darker on the left for text readability, fading to transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 dark:from-background dark:via-background/95 dark:to-background/40" />
        </div>

        <div
          className={cn(
            sectionShell,
            "relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000"
          )}
        >
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:items-center">
            <div className="space-y-8">
              <Badge variant="accent" className="bg-primary/20 text-primary shadow-sm backdrop-blur-md border-primary/30 py-1.5 px-4">
                ✨ AI-guided discovery for modern homebuyers
              </Badge>

              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
                  Find the right home <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">faster</span> with AI.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-foreground/80 sm:text-xl">
                  EstatePro pairs verified inventory, local market insight, and fast
                  natural-language search so you can move from broad ideas to strong options
                  without the usual noise.
                </p>
              </div>

              <div className="rounded-[2rem] bg-background/40 p-2 backdrop-blur-xl border border-border/50 shadow-2xl">
                <AiSearchForm
                  compact
                  className="bg-card/90 shadow-none border-none"
                  description="Try: 'Find me a cheap 3-bedroom place in Austin'"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-border/30 bg-background/40 p-5 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/90">
                    Verified inventory
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">Daily</p>
                </div>
                <div className="rounded-3xl border border-border/30 bg-background/40 p-5 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/90">
                    AI search speed
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">Seconds</p>
                </div>
                <div className="rounded-3xl border border-border/30 bg-background/40 p-5 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/90">
                    Advisor response
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">14 min</p>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-border/30 bg-background/60 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
              <CardHeader className="space-y-4 pb-4">
                <Badge variant="outline" className="w-fit bg-background/50 backdrop-blur-md">
                  Market snapshot
                </Badge>
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold sm:text-[2rem]">
                    Curated homes.
                  </CardTitle>
                  <CardDescription className="text-base text-foreground/70">
                    Buyers using EstatePro prioritize flexible layouts and inventory ready for serious tours.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5 backdrop-blur-sm">
                  <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                    Our AI search connects directly to our live Explore inventory, keeping featured results perfectly aligned with your needs.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm backdrop-blur-md">
                    <span className="text-foreground/80">Active cities</span>
                    <span className="font-bold text-foreground text-base">35</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm backdrop-blur-md">
                    <span className="text-foreground/80">Trusted advisors</span>
                    <span className="font-bold text-foreground text-base">120+</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm backdrop-blur-md">
                    <span className="text-foreground/80">Average shortlist</span>
                    <span className="font-bold text-foreground text-base">6 homes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full rounded-xl shadow-lg transition-all hover:shadow-primary/25 hover:-translate-y-0.5">
                  <Link href="/explore">
                    Explore curated listings
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 sm:py-24">
        <div className={sectionShell}>
          <div className="rounded-[2.5rem] bg-secondary/30 p-8 sm:p-12 border border-border/50">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10">
              <div className="max-w-2xl space-y-3">
                <Badge variant="outline" className="bg-background">EstatePro By The Numbers</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  A polished platform backed by measurable momentum.
                </h2>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {homeStats.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/30"
                >
                  <p className="text-4xl font-bold text-foreground sm:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                    {value}
                  </p>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROPERTIES SECTION --- */}
      <section className="py-12 sm:py-16">
        <div className={cn(sectionShell, "space-y-10")}>
          <SectionHeading
            badge="Featured Properties"
            title="Discover our most exclusive listings."
            description="Real listings ready to power Explore, AI Search, and buyer demos. Pulled directly from your live database."
          />

          {featuredProperties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <Card className="overflow-hidden border-dashed bg-secondary/20">
              <CardContent className="flex flex-col items-center text-center gap-5 p-12 sm:p-16">
                <div className="rounded-full bg-background p-4 shadow-sm mb-2">
                  <HomeIcon className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Seed or add properties to bring this showcase to life.
                </h3>
                <p className="max-w-lg text-base text-muted-foreground">
                  Once properties exist in the database, the homepage will automatically
                  pull the latest four available listings into this section.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row mt-4">
                  <Button asChild className="rounded-xl shadow-md">
                    <Link href="/explore">
                      Go to Explore
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-16 sm:py-24 bg-secondary/10 border-y border-border/30">
        <div className={cn(sectionShell, "space-y-10")}>
          <SectionHeading
            badge="Categories"
            title="Browse by the lifestyle you want."
            description="Shortcuts that keep the homepage visually rich while giving visitors a fast path into the Explore experience."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map(({ count, description, href, icon: Icon, title }) => (
              <Link key={title} href={href} className="group block">
                <Card className="h-full border-border/50 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30">
                  <CardContent className="flex h-full flex-col gap-6 p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-6" />
                      </span>
                      <Badge variant="secondary" className="font-mono">{count}</Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <div className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Browse now
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-16 sm:py-24">
        <div className={cn(sectionShell, "space-y-10")}>
          <SectionHeading
            badge="How It Works"
            title="Three steps from idea to signed deal."
            description="The flow is intentionally simple so first-time buyers and repeat clients both understand what happens next."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: Search,
                title: "Browse",
                description:
                  "Start with AI-assisted search, featured listings, and Explore filters that narrow serious options quickly.",
              },
              {
                step: "02",
                icon: MessageSquare,
                title: "Connect",
                description:
                  "Submit an inquiry or contact the team to coordinate tours, timelines, pricing questions, and next steps.",
              },
              {
                step: "03",
                icon: HomeIcon,
                title: "Own",
                description:
                  "Move into closing with a clearer process, stronger context, and a platform built to reduce friction.",
              },
            ].map(({ description, icon: Icon, step, title }) => (
              <div key={step} className="relative group">
                {/* Decorative background blur */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100" />
                <Card className="relative h-full border-border/50 bg-background/80 p-2 backdrop-blur-sm">
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-black text-muted/30 group-hover:text-primary/20 transition-colors">{step}</span>
                      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-16 sm:py-24 bg-secondary/10 border-y border-border/30">
        <div className={cn(sectionShell, "space-y-10")}>
          <SectionHeading
            badge="Services"
            title="Comprehensive support for your journey."
            description="This service layer rounds out the platform with practical value props that fit naturally beside Explore and Dashboard."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map(({ description, icon: Icon, title }) => (
              <div key={title} className="flex gap-5 rounded-3xl border border-border/40 bg-background/50 p-6 shadow-sm transition-all hover:bg-background/80 hover:shadow-md">
                <div className="shrink-0 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-16 sm:py-24">
        <div className={cn(sectionShell, "space-y-10")}>
          <SectionHeading
            badge="Testimonials"
            title="Clients remember the clarity."
            description="These reviews keep the platform grounded in real outcomes and help reinforce the professional tone."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map(({ initials, name, quote, role }) => (
              <Card key={name} className="h-full border-border/50 bg-background/60 shadow-sm transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-6 p-8">
                  <ReviewsRow />
                  <p className="text-lg italic leading-relaxed text-foreground/90">"{quote}"</p>
                  <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border/40">
                    <Avatar className="size-12 ring-2 ring-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground">{name}</p>
                      <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-16 sm:py-24 bg-secondary/10 border-y border-border/30">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8 lg:items-start">
          <div className="space-y-5 sticky top-28">
            <Badge variant="outline" className="bg-background">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Common questions answered.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
              A few practical answers before visitors move into Explore, inquire on a
              listing, or contact the team directly.
            </p>
          </div>

          <Card className="border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
            <CardContent className="p-2 sm:p-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map(({ answer, question }) => (
                  <AccordionItem key={question} value={question} className="border-border/40 px-4">
                    <AccordionTrigger className="text-left text-base font-semibold hover:text-primary py-5">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="py-16 sm:py-24">
        <div className={sectionShell}>
          <div className="overflow-hidden rounded-[2.5rem] border border-border/50 bg-background shadow-2xl">
            <div className="grid lg:grid-cols-[1fr_400px]">
              <div className="p-8 sm:p-12 space-y-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Newsletter</Badge>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Subscribe for the latest listings before the market moves.
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                    Receive concise listing alerts, price-change updates, and market
                    notes that help serious buyers stay ready without drowning in email.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="py-1.5 px-4 text-sm rounded-full">🔔 New inventory</Badge>
                  <Badge variant="outline" className="py-1.5 px-4 text-sm rounded-full">🏠 Open house</Badge>
                  <Badge variant="outline" className="py-1.5 px-4 text-sm rounded-full">📈 Market notes</Badge>
                </div>
              </div>

              <div className="bg-secondary/30 p-8 sm:p-12 border-l border-border/40 flex items-center">
                <form
                  action="mailto:hello@estatepro.com?subject=Subscribe%20for%20latest%20listings"
                  method="post"
                  encType="text/plain"
                  className="w-full space-y-5"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="newsletter-email"
                      className="text-xs font-bold uppercase tracking-[0.18em] text-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="h-12 rounded-xl bg-background border-border/60"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-bold shadow-md">
                    Subscribe now
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Opens your email client instantly.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-12 pb-24 sm:py-16 sm:pb-32">
        <div className={sectionShell}>
          <div className="relative overflow-hidden rounded-[3rem] p-10 sm:p-16 text-center text-white shadow-2xl">
            {/* CTA Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                alt="Beautiful interior"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm mix-blend-multiply" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
              <Badge className="border-white/20 bg-white/10 text-white backdrop-blur-md px-4 py-1.5 text-sm uppercase tracking-widest">
                Start Your Journey
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                Ready To Find Your Dream Home?
              </h2>
              <p className="text-lg leading-relaxed text-slate-300 max-w-2xl">
                Open Explore, test the AI search, compare real listings, and move
                straight into inquiries when the right fit appears.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row mt-4 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl h-14 px-8 text-base font-bold bg-white text-slate-900 hover:bg-slate-100 transition-transform hover:-translate-y-1"
                >
                  <Link href="/explore">
                    Start exploring
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl h-14 px-8 text-base font-bold border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md transition-transform hover:-translate-y-1"
                >
                  <Link href="/contact">Talk to an advisor</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}