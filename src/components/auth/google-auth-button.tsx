"use client"

import * as React from "react"
import { LoaderCircle } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GoogleAuthButtonProps = {
  callbackUrl: string
  className?: string
  disabled?: boolean
  label?: string
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        d="M21.805 12.23c0-.78-.064-1.35-.202-1.94H12.2v3.56h5.52c-.111.885-.71 2.218-2.043 3.114l-.019.119 2.847 2.206.197.02c1.812-1.674 2.858-4.135 2.858-7.079Z"
        fill="#4285F4"
      />
      <path
        d="M12.2 22c2.702 0 4.974-.885 6.632-2.41l-3.16-2.45c-.847.59-1.982 1.004-3.472 1.004-2.646 0-4.89-1.673-5.689-3.988l-.112.009-2.96 2.29-.038.107C5.05 19.84 8.361 22 12.2 22Z"
        fill="#34A853"
      />
      <path
        d="M6.511 14.156A5.974 5.974 0 0 1 6.176 12c0-.75.129-1.477.344-2.156l-.005-.144-2.996-2.327-.098.046A9.975 9.975 0 0 0 2.4 12c0 1.606.39 3.125 1.022 4.581l3.089-2.425Z"
        fill="#FBBC05"
      />
      <path
        d="M12.2 5.856c1.88 0 3.146.81 3.868 1.49l2.823-2.755C17.163 2.985 14.902 2 12.2 2a9.8 9.8 0 0 0-8.779 5.419l3.099 2.425c.81-2.314 3.043-3.988 5.68-3.988Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function GoogleAuthButton({
  callbackUrl,
  className,
  disabled = false,
  label = "Continue with Google",
}: GoogleAuthButtonProps) {
  const [isPending, setIsPending] = React.useState(false)

  async function handleGoogleAuth() {
    setIsPending(true)

    try {
      await signIn("google", { callbackUrl })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={cn(
        "w-full rounded-2xl border-border/70 bg-background/85 text-foreground hover:bg-background",
        className
      )}
      disabled={disabled || isPending}
      onClick={() => {
        void handleGoogleAuth()
      }}
    >
      {isPending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          Redirecting to Google
        </>
      ) : (
        <>
          <GoogleMark />
          {label}
        </>
      )}
    </Button>
  )
}
