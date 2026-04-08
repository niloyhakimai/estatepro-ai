"use client"

import Link from "next/link"
import * as React from "react"
import { useActionState } from "react"
import { LoaderCircle, LogIn, UserPlus } from "lucide-react"
import { useFormStatus } from "react-dom"

import {
  type RegisterFormState,
  registerUser,
} from "@/app/register/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const initialState: RegisterFormState = {
  status: "idle",
}

function RegisterSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full rounded-2xl"
      disabled={pending}
    >
      {pending ? (
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

export function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="register-name">Full Name</Label>
        <Input
          id="register-name"
          name="name"
          placeholder="Avery Morgan"
          autoComplete="name"
          required
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
          required
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
          required
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "text-sm leading-7",
          state.status === "success"
            ? "text-primary"
            : state.status === "error"
              ? "text-destructive"
              : "text-muted-foreground"
        )}
      >
        {state.message ??
          "Create a basic account first so the existing email and password sign-in flow has a record to authenticate."}
      </p>

      <RegisterSubmitButton />

      <Button
        asChild
        variant="outline"
        className={cn(
          "w-full rounded-2xl",
          state.status === "success" ? "opacity-100" : "opacity-90"
        )}
      >
        <Link href="/login?callbackUrl=%2Fdashboard">
          <LogIn className="size-4" />
          Sign in with existing account
        </Link>
      </Button>
    </form>
  )
}
