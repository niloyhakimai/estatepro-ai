"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { LoaderCircle, LogIn, Sparkles, UserPlus } from "lucide-react"

import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const DEMO_EMAIL = "admin@estatepro.local"
const DEMO_PASSWORD = "12345678"

type LoginFormProps = {
  callbackUrl: string
  showGoogleAuth: boolean
}

export function LoginForm({ callbackUrl, showGoogleAuth }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [pendingAction, setPendingAction] = React.useState<"demo" | "login" | null>(
    null
  )

  async function signInWithCredentials(nextEmail: string, nextPassword: string) {
    setError("")

    const response = await signIn("credentials", {
      email: nextEmail,
      password: nextPassword,
      redirect: false,
      callbackUrl,
    })

    if (response?.error) {
      setError("We could not sign you in with those credentials.")
      return
    }

    router.push(response?.url ?? callbackUrl)
    router.refresh()
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail || !password) {
      setError("Please enter your email address and password.")
      return
    }

    setPendingAction("login")

    try {
      await signInWithCredentials(trimmedEmail, password)
    } catch {
      setError("We could not sign you in right now. Please try again.")
    } finally {
      setPendingAction(null)
    }
  }

  async function handleDemoLogin() {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setPendingAction("demo")

    try {
      await signInWithCredentials(DEMO_EMAIL, DEMO_PASSWORD)
    } catch {
      setError("The demo login is temporarily unavailable. Please try again.")
    } finally {
      setPendingAction(null)
    }
  }

  const isPending = pendingAction !== null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showGoogleAuth ? (
        <>
          <GoogleAuthButton
            callbackUrl={callbackUrl}
            disabled={isPending}
            label="Continue with Google"
          />

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-black/10 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/80 px-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 backdrop-blur-sm dark:bg-black/60 dark:text-white/40">
                or sign in with email
              </span>
            </div>
          </div>
        </>
      ) : null}

      <div className="space-y-2.5">
        <label
          htmlFor="login-email"
          className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
        >
          Email Address
        </label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isPending}
          required
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label
          htmlFor="login-password"
          className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
        >
          Password
        </label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isPending}
          required
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "px-1 text-[0.8rem] font-medium leading-relaxed transition-colors",
          error ? "text-red-500" : "text-slate-500 dark:text-white/50"
        )}
      >
        {error ||
          "Use your registered credentials, continue with Google, or launch the seeded admin account instantly."}
      </p>

      <div className="space-y-3">
        <Button 
          type="submit" 
          disabled={isPending}
          className="h-12 w-full rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
        >
          {pendingAction === "login" ? (
            <>
              <LoaderCircle className="mr-2 size-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="mr-2 size-4" />
              Sign in
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => {
            void handleDemoLogin()
          }}
          className="h-12 w-full rounded-[1.15rem] border-black/10 bg-white/50 px-8 font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-black/40"
        >
          {pendingAction === "demo" ? (
            <>
              <LoaderCircle className="mr-2 size-5 animate-spin" />
              Launching demo access...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 size-4" />
              Instant Admin Access
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 rounded-[1.15rem] border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium transition-colors dark:bg-primary/10 sm:flex-row sm:gap-2">
        <span className="text-slate-600 dark:text-white/70">Quick admin demo:</span>
        <div className="flex items-center">
          <span className="font-bold text-slate-900 dark:text-white">{DEMO_EMAIL}</span>
          <span className="mx-2 text-slate-400 dark:text-white/30">/</span>
          <span className="font-black tracking-[0.14em] text-slate-900 dark:text-white">{DEMO_PASSWORD}</span>
        </div>
      </div>

      <Button 
        asChild 
        variant="ghost" 
        className="w-full text-[0.8rem] font-bold text-slate-500 hover:bg-black/5 hover:text-slate-900 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
          <UserPlus className="mr-2 size-4" />
          Create a new account instead
        </Link>
      </Button>
    </form>
  )
}