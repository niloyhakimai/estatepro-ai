import Link from "next/link"
import {
  ArrowRight,
  Compass,
  Handshake,
  LineChart,
  ShieldCheck,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const missionPillars = [
  {
    title: "Trusted market guidance",
    description:
      "We combine clean listing experiences with practical advisory support so buyers and investors can move faster with less uncertainty.",
    icon: ShieldCheck,
  },
  {
    title: "Experience-first product design",
    description:
      "Every EstatePro screen is designed to make property discovery feel calmer, more transparent, and easier to act on.",
    icon: Compass,
  },
  {
    title: "Long-term client relationships",
    description:
      "We care about neighborhood fit, resale potential, and decision confidence, not just the first click or inquiry.",
    icon: Handshake,
  },
]

const companyStats = [
  { value: "35+", label: "Markets served" },
  { value: "500+", label: "Homes matched" },
  { value: "120+", label: "Advisors & partners" },
]

const teamMembers = [
  {
    name: "Maya Bennett",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    bio: "Leads EstatePro's vision around trust, thoughtful growth, and a more client-friendly real estate experience.",
  },
  {
    name: "Jordan Lee",
    role: "Head of Brokerage Partnerships",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
    bio: "Works closely with agents and seller teams to raise listing quality, response speed, and neighborhood coverage.",
  },
  {
    name: "Avery Morgan",
    role: "Director of Client Success",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    bio: "Oversees buyer and investor support, helping clients move from discovery to closing with clear next steps.",
  },
  {
    name: "Noah Rivera",
    role: "Market Insights Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
    bio: "Translates pricing trends, local signals, and inventory movement into practical guidance for smarter decisions.",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[60vh] items-center pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Modern office"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:items-center">
            <div className="space-y-6">
              <Badge variant="accent" className="bg-primary/10 text-primary border-primary/20 py-1.5 px-4 shadow-sm">
                About EstatePro
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                A modern real estate platform built on <span className="text-primary">trust</span> and clarity.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                EstatePro helps buyers, sellers, and investors navigate the
                market with verified listings, elegant tools, and advisory
                support that feels professional from the first search to closing.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row pt-4">
                <Button asChild size="lg" className="rounded-xl shadow-lg transition-transform hover:-translate-y-0.5">
                  <Link href="/explore">
                    Explore listings
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-border/60 bg-background/50 backdrop-blur-md transition-transform hover:-translate-y-0.5">
                  <Link href="/contact">Talk with our team</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/40 bg-background/60 p-6 shadow-xl backdrop-blur-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Company Momentum
              </p>
              <div className="space-y-3">
                {companyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-xl border border-border/30 bg-background/50 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-background/80"
                  >
                    <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                    <span className="text-xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground/80">
                Designed for those who demand better visibility into pricing and better presentation across listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 mt-12">
        {/* --- MISSION SECTION --- */}
        <section>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <Badge variant="outline" className="bg-background">Our Mission</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Make real estate feel more human.
            </h2>
            <p className="text-lg text-muted-foreground">
              We believe the best experiences combine strong market knowledge, exceptional design, and practical guidance.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {missionPillars.map(({ description, icon: Icon, title }) => (
              <Card key={title} className="border-border/50 bg-background/50 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="rounded-[3rem] bg-secondary/20 p-8 sm:p-16 border border-border/30">
          <div className="max-w-2xl space-y-4 mb-12">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Leadership Team</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A focused team driving better decisions.
            </h2>
            <p className="text-lg text-muted-foreground">
              EstatePro brings together experts who care deeply about exceptional user experience and practical guidance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-square w-full overflow-hidden">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-4">{member.role}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- WHY US SECTION --- */}
        <section>
          <Card className="overflow-hidden border-border/50 shadow-lg bg-background/60 backdrop-blur-sm">
            <CardContent className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1.2fr)_1fr] lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="bg-background">Why Clients Choose Us</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
                  Better listings. Cleaner tools. Calmer support.
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Whether you are narrowing down neighborhoods, preparing to sell,
                  or comparing investment options, EstatePro is built to keep the
                  process easier to understand and move forward.
                </p>
                <Button asChild className="rounded-xl mt-2">
                  <Link href="/explore">Start searching</Link>
                </Button>
              </div>

              <div className="rounded-[2rem] border border-border/40 bg-secondary/30 p-8">
                <p className="flex items-center gap-3 text-lg font-bold text-foreground mb-6">
                  <span className="p-2 rounded-lg bg-primary/10">
                    <LineChart className="size-5 text-primary" />
                  </span>
                  Platform Focus
                </p>
                <ul className="space-y-4 text-base font-medium text-muted-foreground">
                  <li className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-5 py-4 shadow-sm">
                    <ShieldCheck className="size-5 text-primary" />
                    Verified listing presentation
                  </li>
                  <li className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-5 py-4 shadow-sm">
                    <Handshake className="size-5 text-primary" />
                    Streamlined inquiry for serious buyers
                  </li>
                  <li className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-5 py-4 shadow-sm">
                    <Compass className="size-5 text-primary" />
                    AI-assisted search and support
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}