"use client"

import { LoaderCircle, Save } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DashboardSubmitButtonProps = {
  className?: string
  idleLabel: string
  pendingLabel: string
}

export function DashboardSubmitButton({
  className,
  idleLabel,
  pendingLabel,
}: DashboardSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className={cn(
        "h-12 w-full rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]",
        className
      )}
    >
      {pending ? (
        <>
          <LoaderCircle className="mr-2 size-5 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        <>
          <Save className="mr-2 size-4" />
          {idleLabel}
        </>
      )}
    </Button>
  )
}