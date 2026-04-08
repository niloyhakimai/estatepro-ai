"use client"

import Link from "next/link"
import * as React from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { CheckCircle2, LoaderCircle, LogIn, UserPlus } from "lucide-react"

import {
  type RegisterFormState,
  registerUser,
} from "@/app/register/actions"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const initialState: RegisterFormState = {
  status: "idle",
}

type RegisterSubmitButtonProps = {
  disabled: boolean
  pending: boolean
}

function RegisterSubmitButton({
  disabled,
  pending,
}: RegisterSubmitButtonProps) {
  const isBusy = disabled || pending

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full rounded-2xl"
      disabled={isBusy}
    >
      {isBusy ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          Creating account
        </>
      ) : (
        <>
          <UserPlus className="size-4" />
          Create account
        </>
      )}
    </Button>
  )
}

function RegisterGoogleButton({
  callbackUrl,
  disabled,
}: {
  callbackUrl: string
  disabled: boolean
}) {
  return (
    <GoogleAuthButton
      callbackUrl={callbackUrl}
      disabled={disabled}
      label="Continue with Google"
    />
  )
}

type RegisterFormProps = {
  callbackUrl: string
  showGoogleAuth: boolean
}

export function RegisterForm({
  callbackUrl,
  showGoogleAuth,
}: RegisterFormProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerUser, initialState)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [clientMessage, setClientMessage] = React.useState("")
  const [authPhase, setAuthPhase] = React.useState<
    "idle" | "redirecting" | "signing-in"
  >("idle")
  const [showSuccessOverlay, setShowSuccessOverlay] = React.useState(false)
  const submittedCredentialsRef = React.useRef({ email: "", password: "" })
  const hasStartedAutoLoginRef = React.useRef(false)
  const redirectTimeoutRef = React.useRef<number | null>(null)

  const isLocked = isPending || authPhase !== "idle" || showSuccessOverlay

  React.useEffect(() => {
    if (state.status === "error") {
      setAuthPhase("idle")
      setShowSuccessOverlay(false)
      hasStartedAutoLoginRef.current = false
      return
    }

    if (state.status !== "success" || hasStartedAutoLoginRef.current) {
      return
    }

    hasStartedAutoLoginRef.current = true

    const nextEmail = submittedCredentialsRef.current.email
    const nextPassword = submittedCredentialsRef.current.password

    if (!nextEmail || !nextPassword) {
      setClientMessage(
        "Your account is ready, but we need your fresh credentials to sign in automatically. Please sign in manually."
      )
      setAuthPhase("idle")
      return
    }

    let isMounted = true
    setClientMessage("")
    setAuthPhase("signing-in")

    void (async () => {
      try {
        const response = await signIn("credentials", {
          email: nextEmail,
          password: nextPassword,
          redirect: false,
          callbackUrl,
        })

        if (!isMounted) {
          return
        }

        if (response?.error) {
          setClientMessage(
            "Your account was created, but automatic sign-in is unavailable right now. Please use your new credentials to continue."
          )
          setAuthPhase("idle")
          return
        }

        setShowSuccessOverlay(true)
        setAuthPhase("redirecting")
        redirectTimeoutRef.current = window.setTimeout(() => {
          router.push(response?.url ?? callbackUrl)
          router.refresh()
        }, 2250)
      } catch {
        if (!isMounted) {
          return
        }

        setClientMessage(
          "Your account was created, but automatic sign-in is unavailable right now. Please use your new credentials to continue."
        )
        setAuthPhase("idle")
      }
    })()

    return () => {
      isMounted = false
    }
  }, [callbackUrl, router, state.status])

  React.useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current)
      }
    }
  }, [])

  const feedbackMessage =
    clientMessage ||
    (authPhase === "signing-in"
      ? "Your account is ready. Securing your EstatePro session now."
      : state.message ??
        "Create a premium account to unlock your private dashboard and concierge-level listing experience.")

  const feedbackToneClass = clientMessage
    ? "text-destructive"
    : state.status === "success" || authPhase === "signing-in"
      ? "text-primary"
      : state.status === "error"
        ? "text-destructive"
        : "text-muted-foreground"

  return (
    <>
      {showSuccessOverlay ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/72 px-6 backdrop-blur-xl">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-background/90 p-8 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,177,166,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(200,148,67,0.16),transparent_34%)]"
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_0_14px_rgba(37,177,166,0.08)]">
                <CheckCircle2 className="size-10" />
              </div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-primary">
                Access Confirmed
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-[2.1rem]">
                Welcome to EstatePro!
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                Your private membership has been activated and your premium workspace is being prepared.
              </p>

              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-3">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                </span>
                <span className="animate-pulse text-sm font-semibold text-foreground">
                  Redirecting to your dashboard...
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <form
        action={formAction}
        className="space-y-5"
        onSubmit={() => {
          hasStartedAutoLoginRef.current = false
          setClientMessage("")
          setShowSuccessOverlay(false)
          setAuthPhase("idle")
          submittedCredentialsRef.current = {
            email: email.trim().toLowerCase(),
            password,
          }
        }}
      >
        {showGoogleAuth ? (
          <>
            <RegisterGoogleButton callbackUrl={callbackUrl} disabled={isLocked} />

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background/60 px-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  or create with email
                </span>
              </div>
            </div>
          </>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="register-name">Full Name</Label>
          <Input
            id="register-name"
            name="name"
            placeholder="Avery Morgan"
            autoComplete="name"
            disabled={isLocked}
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">Email Address</Label>
          <Input
            id="register-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLocked}
            onChange={(event) => setEmail(event.target.value)}
            required
            value={email}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            disabled={isLocked}
            onChange={(event) => setPassword(event.target.value)}
            required
            value={password}
          />
        </div>

        <p
          aria-live="polite"
          className={cn("text-sm leading-7", feedbackToneClass)}
        >
          {feedbackMessage}
        </p>

        <RegisterSubmitButton disabled={isLocked} pending={isPending} />

        <Button
          asChild
          variant="outline"
          className={cn(
            "w-full rounded-2xl",
            state.status === "success" ? "opacity-100" : "opacity-90"
          )}
        >
          <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
            <LogIn className="size-4" />
            Sign in with existing account
          </Link>
        </Button>
      </form>
    </>
  )
}
