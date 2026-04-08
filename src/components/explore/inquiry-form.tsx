"use client"

import * as React from "react"
import { useActionState } from "react"
import { LoaderCircle, Send, CheckCircle2, AlertCircle } from "lucide-react"

import {
  createInquiry,
  type InquiryFormState,
} from "@/app/explore/[id]/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const initialState: InquiryFormState = {
  status: "idle",
}

type InquiryFormProps = {
  propertyId: string
}

export function InquiryForm({ propertyId }: InquiryFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const createInquiryForProperty = createInquiry.bind(null, propertyId)
  const [state, formAction, pending] = useActionState(
    createInquiryForProperty,
    initialState
  )

  React.useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="space-y-2.5">
        <label
          htmlFor="inquiry-message"
          className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80 pl-1"
        >
          Your Message
        </label>
        <Textarea
          id="inquiry-message"
          name="message"
          placeholder="Tell us what you would like to know about the property, timing, financing status, or preferred showing window."
          required
          className="min-h-[120px] resize-none rounded-xl bg-background/50 border-border/60 p-4 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full rounded-xl h-12 text-base font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95" 
        disabled={pending}
      >
        {pending ? (
          <>
            <LoaderCircle className="mr-2 size-5 animate-spin" />
            Sending securely...
          </>
        ) : (
          <>
            <Send className="mr-2 size-5" />
            Submit Inquiry
          </>
        )}
      </Button>

      {/* --- PREMIUM STATUS MESSAGE BOX --- */}
      <div
        aria-live="polite"
        className={cn(
          "rounded-xl p-4 text-sm leading-relaxed transition-all duration-300",
          state.status === "success"
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            : state.status === "error"
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-secondary/30 text-muted-foreground border border-border/40"
        )}
      >
        <div className="flex items-start gap-3">
          {state.status === "success" && <CheckCircle2 className="size-5 shrink-0" />}
          {state.status === "error" && <AlertCircle className="size-5 shrink-0" />}
          {state.status === "idle" && <Send className="size-5 shrink-0 opacity-50" />}
          <p className="font-medium">
            {state.message ??
              "A member of our elite advisory team will review your message and follow up shortly."}
          </p>
        </div>
      </div>
    </form>
  )
}