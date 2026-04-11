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
      "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 shadow-sm",
    iconClass: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  },
  {
    role: "Manager",
    title: "Operations Desk",
    email: "manager@gmail.com",
    destination: "/dashboard/manager",
    icon: UserCog,
    accentClass:
      "border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 dark:bg-sky-500/10 dark:hover:bg-sky-500/20 shadow-sm",
    iconClass: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
  },
  {
    role: "User",
    title: "Private Member",
    email: "user@estatepro.local",
    destination: "/dashboard/user",
    icon: CircleUserRound,
    accentClass:
      "border-black/5 bg-white/60 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] shadow-sm",
    iconClass: "bg-black/5 text-slate-700 dark:bg-white/10 dark:text-white/80",
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
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-8">
      {/* --- FULLSCREEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2067&auto=format&fit=crop"
          alt="Luxury Estate Interior"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-100/70 backdrop-blur-md transition-colors duration-500 dark:bg-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/90 transition-colors duration-500 dark:via-black/50 dark:to-black/90" />
      </div>

      {/* --- GLASSMORPHIC MAIN PANEL --- */}
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/70 shadow-[0_38px_110px_-42px_rgba(15,23,42,0.3)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-black/60 dark:shadow-[0_38px_110px_-42px_rgba(0,0,0,0.8)] sm:rounded-[3rem] lg:grid-cols-[1.1fr_1fr]">
        
        {/* Left Side: Brand & Info */}
        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md dark:bg-primary/20">
              Client Portal
            </Badge>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl">
              Welcome back to EstatePro.
            </h1>
            <p className="max-w-md text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
              Sign in to manage your saved properties, track inquiries, and access your personalized real estate dashboard.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {loginHighlights.map(({ description, icon: Icon, title }) => (
              <div
                key={title}
                className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:hover:bg-white/[0.05]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 dark:bg-primary/20">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 transition-colors dark:text-white">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500 transition-colors dark:text-white/60">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-black/5 bg-black/[0.02] p-6 shadow-inner transition-colors dark:border-white/10 dark:bg-black/40">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <Badge
                  variant="secondary"
                  className="bg-black/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-600 shadow-none dark:bg-white/10 dark:text-white/70"
                >
                  Quick Access
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Demo Credentials
                  </h2>
                  <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-white/60">
                    Use these seeded premium accounts to preview each EstatePro
                    dashboard role with the luxury UI fully enabled.
                  </p>
                </div>
              </div>

              <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white/60 text-primary shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex">
                <Sparkles className="size-6" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
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
                    className={`rounded-[1.6rem] border p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${accentClass}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-[1.2rem] ${iconClass}`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                            {role}
                          </p>
                          <span className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-white/50">
                            {destination}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                          {title}
                        </h3>
                        <p className="mt-0.5 break-all text-sm font-medium text-slate-500 dark:text-white/60">
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-primary/15 bg-primary/10 px-5 py-4 dark:bg-primary/20">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
                Shared Demo Password
              </p>
              <p className="mt-1 text-lg font-black tracking-[0.16em] text-slate-900 dark:text-white">
                12345678
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center border-t border-black/5 bg-white/40 p-8 transition-colors dark:border-white/10 dark:bg-black/40 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
          <div className="mb-8 space-y-3 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">Sign In</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Enter your credentials to access your account.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-6 shadow-xl backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-black/40 sm:p-8">
            <LoginForm
              callbackUrl={callbackUrl}
              showGoogleAuth={hasGoogleProviderEnabled}
            />
          </div>

          <div className="mt-8 text-center sm:text-left">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Don&apos;t have an account yet?
            </p>
            <Button asChild variant="link" className="mt-1 h-auto p-0 text-base font-bold text-primary hover:text-primary/80 hover:no-underline">
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