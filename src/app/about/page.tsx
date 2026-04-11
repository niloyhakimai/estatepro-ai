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
    <div className="pb-24 transition-colors duration-500">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[65vh] items-center pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Modern office"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-md transition-colors duration-500 dark:bg-slate-950/90" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-primary/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md dark:bg-primary/20">
                About EstatePro
              </Badge>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl lg:text-[4rem] lg:leading-tight">
                A modern real estate platform built on <span className="text-primary">trust</span> and clarity.
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70 sm:text-xl">
                EstatePro helps buyers, sellers, and investors navigate the
                market with verified listings, elegant tools, and advisory
                support that feels professional from the first search to closing.
              </p>
              
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
                >
                  <Link href="/explore">
                    Explore listings
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="h-14 rounded-[1.15rem] border-black/10 bg-white/50 px-8 font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 dark:border-white/10 dark:bg-black/40 dark:text-white dark:hover:bg-black/60"
                >
                  <Link href="/contact">Talk with our team</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-8 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
              <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                Company Momentum
              </p>
              <div className="space-y-3">
                {companyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.02] px-5 py-4 backdrop-blur-sm transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
                  >
                    <span className="text-sm font-bold text-slate-500 dark:text-white/60">{stat.label}</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-4 text-sm font-medium leading-relaxed text-slate-700 dark:text-white/80">
                Designed for those who demand better visibility into pricing and better presentation across listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-16 w-full max-w-7xl space-y-32 px-4 sm:px-6 lg:px-8">
        
        {/* --- MISSION SECTION --- */}
        <section>
          <div className="mx-auto mb-16 max-w-3xl text-center space-y-6">
            <Badge variant="secondary" className="bg-black/5 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-none dark:bg-white/10 dark:text-white/70">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl">
              Make real estate feel more human.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
              We believe the best experiences combine strong market knowledge, exceptional design, and practical guidance.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {missionPillars.map(({ description, icon: Icon, title }) => (
              <Card key={title} className="group overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-black/40 dark:hover:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
                <CardContent className="p-8 sm:p-10">
                  <div className="mb-8 inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 dark:bg-primary/20">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 transition-colors dark:text-white">{title}</h3>
                  <p className="text-base font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="relative overflow-hidden rounded-[3rem] border border-black/5 bg-slate-100/50 p-8 transition-colors duration-500 dark:border-white/10 dark:bg-black/20 sm:p-16">
          <div className="mb-16 max-w-2xl space-y-6">
            <Badge variant="secondary" className="bg-primary/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
              Leadership Team
            </Badge>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl">
              A focused team driving better decisions.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
              EstatePro brings together experts who care deeply about exceptional user experience and practical guidance.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="group overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-black/40 dark:hover:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
                <div className="aspect-square w-full overflow-hidden p-2">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full rounded-[2rem] object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 transition-colors dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mb-4 mt-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-primary">
                    {member.role}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- WHY US SECTION --- */}
        <section>
          <Card className="overflow-hidden rounded-[3rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
            <CardContent className="grid gap-12 p-8 sm:p-16 lg:grid-cols-[minmax(0,1.2fr)_1fr] lg:items-center">
              <div className="space-y-8">
                <Badge variant="secondary" className="bg-black/5 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-none dark:bg-white/10 dark:text-white/70">
                  Why Clients Choose Us
                </Badge>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl">
                  Better listings. Cleaner tools. Calmer support.
                </h2>
                <p className="text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
                  Whether you are narrowing down neighborhoods, preparing to sell,
                  or comparing investment options, EstatePro is built to keep the
                  process easier to understand and move forward.
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
                >
                  <Link href="/explore">Start searching</Link>
                </Button>
              </div>

              <div className="rounded-[2.5rem] border border-black/5 bg-black/[0.02] p-8 shadow-inner transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
                <p className="mb-8 flex items-center gap-3 text-lg font-bold text-slate-900 transition-colors dark:text-white">
                  <span className="rounded-[1rem] bg-primary/10 p-2.5 dark:bg-primary/20">
                    <LineChart className="size-6 text-primary" />
                  </span>
                  Platform Focus
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Verified listing presentation" },
                    { icon: Handshake, text: "Streamlined inquiry for serious buyers" },
                    { icon: Compass, text: "AI-assisted search and support" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 rounded-[1.25rem] border border-black/5 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-md transition-colors dark:border-white/10 dark:bg-black/60">
                      <item.icon className="size-6 text-primary" />
                      <span className="font-bold text-slate-700 dark:text-white/90">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}