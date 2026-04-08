"use client"

import { LoaderCircle, Save } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

type DashboardSubmitButtonProps = {
  idleLabel: string
  pendingLabel: string
}

export function DashboardSubmitButton({
  idleLabel,
  pendingLabel,
}: DashboardSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" className="w-full rounded-2xl" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        <>
          <Save className="size-4" />
          {idleLabel}
        </>
      )}
    </Button>
  )
}
