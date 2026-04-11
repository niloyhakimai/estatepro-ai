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
      disabled={isBusy}
      className="h-12 w-full rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
    >
      {isBusy ? (
        <>
          <LoaderCircle className="mr-2 size-5 animate-spin" />
          Creating account...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 size-4" />
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
    ? "text-red-500"
    : state.status === "success" || authPhase === "signing-in"
      ? "text-emerald-600 dark:text-emerald-400"
      : state.status === "error"
        ? "text-red-500"
        : "text-slate-500 dark:text-white/50"

  return (
    <>
      {showSuccessOverlay ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-100/50 px-6 backdrop-blur-xl transition-colors dark:bg-slate-950/80">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[3rem] border border-black/5 bg-white/90 p-8 shadow-[0_40px_120px_-48px_rgba(15,23,42,0.3)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-black/90 dark:shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95)] sm:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,177,166,0.1),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(200,148,67,0.08),transparent_34%)] dark:bg-[radial-gradient(circle_at_top,rgba(37,177,166,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(200,148,67,0.16),transparent_34%)]"
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_0_14px_rgba(21,159,149,0.05)] transition-colors dark:bg-primary/20 dark:shadow-[0_0_0_14px_rgba(41,194,179,0.1)]">
                <CheckCircle2 className="size-10" />
              </div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-primary">
                Access Confirmed
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900 transition-colors dark:text-white sm:text-[2.1rem]">
                Welcome to EstatePro!
              </h3>
              <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
                Your private membership has been activated and your premium workspace is being prepared.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/5 bg-black/[0.02] px-6 py-3 transition-colors dark:border-white/10 dark:bg-white/5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                </span>
                <span className="animate-pulse text-sm font-bold text-slate-900 transition-colors dark:text-white">
                  Redirecting to your dashboard...
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <form
        action={formAction}
        className="space-y-6"
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

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-black/10 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/80 px-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 backdrop-blur-sm dark:bg-black/60 dark:text-white/40">
                  or create with email
                </span>
              </div>
            </div>
          </>
        ) : null}

        <div className="space-y-2.5">
          <label
            htmlFor="register-name"
            className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
          >
            Full Name
          </label>
          <Input
            id="register-name"
            name="name"
            placeholder="Avery Morgan"
            autoComplete="name"
            disabled={isLocked}
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
            className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
          />
        </div>

        <div className="space-y-2.5">
          <label
            htmlFor="register-email"
            className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
          >
            Email Address
          </label>
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
            className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
          />
        </div>

        <div className="space-y-2.5">
          <label
            htmlFor="register-password"
            className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
          >
            Password
          </label>
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
            className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
          />
        </div>

        <p
          aria-live="polite"
          className={cn("px-1 text-[0.8rem] font-medium leading-relaxed transition-colors", feedbackToneClass)}
        >
          {feedbackMessage}
        </p>

        <div className="space-y-3">
          <RegisterSubmitButton disabled={isLocked} pending={isPending} />

          <Button
            asChild
            variant="outline"
            className={cn(
              "h-12 w-full rounded-[1.15rem] border-black/10 bg-white/50 px-8 font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-black/40",
              state.status === "success" ? "opacity-100" : "opacity-90"
            )}
          >
            <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
              <LogIn className="mr-2 size-4" />
              Sign in with existing account
            </Link>
          </Button>
        </div>
      </form>
    </>
  )
}