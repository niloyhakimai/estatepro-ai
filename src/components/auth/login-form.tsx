"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { LoaderCircle, LogIn, Sparkles, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const DEMO_EMAIL = "seed-admin@estatepro.local"
const DEMO_PASSWORD = "SeedAdmin123!"

type LoginFormProps = {
  callbackUrl: string
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email Address</Label>
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
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
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
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "text-sm leading-7",
          error ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {error ||
          "Use your registered credentials, or choose Demo Login to access the seeded admin experience instantly."}
      </p>

      <Button type="submit" size="lg" className="w-full rounded-2xl" disabled={isPending}>
        {pendingAction === "login" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Signing in
          </>
        ) : (
          <>
            <LogIn className="size-4" />
            Sign in
          </>
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full rounded-2xl"
        disabled={isPending}
        onClick={() => {
          void handleDemoLogin()
        }}
      >
        {pendingAction === "demo" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Launching demo access
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Demo Login
          </>
        )}
      </Button>

      <div className="rounded-[1.55rem] border border-border/70 bg-background/70 p-4 text-sm leading-7 text-muted-foreground">
        Demo credentials: <span className="font-medium text-foreground">{DEMO_EMAIL}</span>
      </div>

      <Button asChild variant="link" className="w-full px-0">
        <Link href="/register">
          <UserPlus className="size-4" />
          Create a new account instead
        </Link>
      </Button>
    </form>
  )
}
