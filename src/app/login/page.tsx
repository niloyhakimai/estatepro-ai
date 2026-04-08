import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  CircleUserRound,
  ShieldCheck,
  Sparkles,
  UserCog,
} from "lucide-react"

import {
  getAuthSession,
  hasGoogleProviderEnabled,
} from "@/app/api/auth/[...nextauth]/auth-options"
import { LoginForm } from "@/components/auth/login-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const loginHighlights = [
  {
    title: "Premium Market Access",
    description: "Open the curated admin dashboard with one click.",
    icon: Sparkles,
  },
  {
    title: "Bank-Level Security",
    description: "Your session and data are protected with enterprise-grade security.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Property Workflows",
    description: "Inquiries and advisory tools unlock immediately upon sign-in.",
    icon: CheckCircle2,
  },
] as const

const demoAccounts = [
  {
    role: "Admin",
    title: "Administrator Suite",
    email: "admin@estatepro.local",
    destination: "/dashboard/admin",
    icon: ShieldCheck,
    accentClass:
      "border-primary/25 bg-primary/[0.08] shadow-[0_28px_80px_-48px_rgba(37,177,166,0.9)]",
    iconClass: "bg-primary/15 text-primary ring-1 ring-primary/20",
  },
  {
    role: "Manager",
    title: "Operations Desk",
    email: "manager@gmail.com",
    destination: "/dashboard/manager",
    icon: UserCog,
    accentClass:
      "border-accent/20 bg-accent/[0.08] shadow-[0_28px_80px_-48px_rgba(200,148,67,0.8)]",
    iconClass: "bg-accent/15 text-accent ring-1 ring-accent/20",
  },
  {
    role: "User",
    title: "Private Member",
    email: "user@estatepro.local",
    destination: "/dashboard/user",
    icon: CircleUserRound,
    accentClass:
      "border-white/10 bg-white/[0.04] shadow-[0_28px_80px_-48px_rgba(148,163,184,0.45)]",
    iconClass: "bg-white/10 text-foreground ring-1 ring-white/10",
  },
] as const

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? ""
}

function normalizeCallbackUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value
  }

  return "/dashboard"
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const callbackUrl = normalizeCallbackUrl(
    getStringParam(params.callbackUrl).trim() || "/dashboard"
  )
  const session = await getAuthSession()

  if (session?.user) {
    redirect(callbackUrl)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8">
      {/* --- FULLSCREEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2067&auto=format&fit=crop"
          alt="Luxury Estate Interior"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/90" />
      </div>

      {/* --- GLASSMORPHIC MAIN PANEL --- */}
      <div className="relative z-10 w-full max-w-6xl grid overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 bg-background/80 shadow-2xl backdrop-blur-xl lg:grid-cols-[1.1fr_1fr]">
        
        {/* Left Side: Brand & Info */}
        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary py-1.5 px-4 backdrop-blur-md">
              Client Portal
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Welcome back to EstatePro.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Sign in to manage your saved properties, track inquiries, and access your personalized real estate dashboard.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {loginHighlights.map(({ description, icon: Icon, title }) => (
              <div
                key={title}
                className="group flex items-start gap-4 rounded-2xl border border-border/30 bg-background/40 p-4 transition-all hover:bg-background/80 hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-[0_28px_90px_-52px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="border-primary/20 bg-primary/10 px-3 py-1 text-primary"
                >
                  Quick Access
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    Demo Credentials
                  </h2>
                  <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                    Use these seeded premium accounts to preview each EstatePro
                    dashboard role with the luxury UI fully enabled.
                  </p>
                </div>
              </div>

              <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[0_18px_40px_-24px_rgba(37,177,166,0.9)] sm:flex">
                <Sparkles className="size-6" />
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {demoAccounts.map(
                ({
                  accentClass,
                  destination,
                  email,
                  icon: Icon,
                  iconClass,
                  role,
                  title,
                }) => (
                  <div
                    key={email}
                    className={`rounded-[1.6rem] border p-4 backdrop-blur-xl transition-transform hover:-translate-y-0.5 ${accentClass}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-[1.2rem] ${iconClass}`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            {role}
                          </p>
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {destination}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-foreground">
                          {title}
                        </h3>
                        <p className="mt-1 break-all text-sm text-muted-foreground">
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-primary/15 bg-primary/10 px-4 py-3">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-primary/80">
                Shared Demo Password
              </p>
              <p className="mt-1 text-lg font-semibold tracking-[0.16em] text-foreground">
                12345678
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center border-t border-white/10 bg-card/40 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
          <div className="space-y-6 mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
            <p className="text-sm font-medium text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border/50 bg-background/60 p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <LoginForm
              callbackUrl={callbackUrl}
              showGoogleAuth={hasGoogleProviderEnabled}
            />
          </div>

          <div className="mt-8 text-center sm:text-left">
            <p className="text-sm font-medium text-muted-foreground">
              Don&apos;t have an account yet?
            </p>
            <Button asChild variant="link" className="mt-1 h-auto p-0 text-primary font-bold text-base hover:no-underline hover:text-primary/80">
              <Link
                href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="flex items-center"
              >
                Create a VIP account <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
