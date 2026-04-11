import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react"

import {
  getAuthSession,
  hasGoogleProviderEnabled,
} from "@/app/api/auth/[...nextauth]/auth-options"
import { RegisterForm } from "@/components/auth/register-form"
import { getDashboardHomeByRole } from "@/components/dashboard/dashboard-auth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type RegisterPageProps = {
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

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams
  const callbackUrl = normalizeCallbackUrl(
    getStringParam(params.callbackUrl).trim() || "/dashboard"
  )
  const session = await getAuthSession()

  if (session?.user) {
    redirect(getDashboardHomeByRole(session.user.role))
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-8">
      {/* --- FULLSCREEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
          alt="Luxury Villa Exterior"
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
              Exclusive Membership
            </Badge>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl">
              Create your VIP account.
            </h1>
            <p className="max-w-md text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
              Join EstatePro to manage your luxury portfolio, save exclusive listings, and connect directly with elite advisors.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                title: "Bank-Level Security",
                description: "Passwords are encrypted and stored with enterprise-grade security protocols.",
                icon: ShieldCheck,
              },
              {
                title: "Priority Advisory Access",
                description: "New accounts can immediately use the private property inquiry flow.",
                icon: CheckCircle2,
              },
              {
                title: "Curated Portfolio",
                description: "Your personalized dashboard and tailored settings are available instantly.",
                icon: Sparkles,
              },
            ].map(({ description, icon: Icon, title }) => (
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
        </div>

        {/* Right Side: Register Form */}
        <div className="flex flex-col justify-center border-t border-black/5 bg-white/40 p-8 transition-colors dark:border-white/10 dark:bg-black/40 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
          <div className="mb-8 space-y-3 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">Register</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Set up your credentials to access the private network.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-6 shadow-xl backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-black/40 sm:p-8">
            <RegisterForm
              callbackUrl={callbackUrl}
              showGoogleAuth={hasGoogleProviderEnabled}
            />
          </div>

          <div className="mt-8 text-center sm:text-left">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Already a member?
            </p>
            <Button asChild variant="link" className="mt-1 h-auto p-0 text-base font-bold text-primary hover:text-primary/80 hover:no-underline">
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="flex items-center"
              >
                Sign in to your account <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}