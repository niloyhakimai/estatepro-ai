"use client"

import * as React from "react"
import { CheckCircle2, LoaderCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showToast, setShowToast] = React.useState(false)

  React.useEffect(() => {
    if (!showToast) {
      return
    }

    const timer = window.setTimeout(() => {
      setShowToast(false)
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [showToast])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)

    window.setTimeout(() => {
      formRef.current?.reset()
      setIsSubmitting(false)
      setShowToast(true)
    }, 800)
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2.5">
            <Label 
              htmlFor="contact-name"
              className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80 pl-1"
            >
              Full Name
            </Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Avery Morgan"
              autoComplete="name"
              required
              className="h-12 rounded-xl bg-background/50 border-border/60 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2.5">
            <Label 
              htmlFor="contact-email"
              className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80 pl-1"
            >
              Email Address
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-12 rounded-xl bg-background/50 border-border/60 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <Label 
            htmlFor="contact-message"
            className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/80 pl-1"
          >
            Message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Tell us what you are looking for, your target area, timeline, or how our team can help."
            required
            className="resize-none rounded-xl bg-background/50 border-border/60 p-4 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground pl-1">
          We typically respond within one business day for general questions,
          buyer support, and seller consultations.
        </p>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-xl h-12 text-base font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 size-5 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="mr-2 size-5" />
              Send Message
            </>
          )}
        </Button>
      </form>

      {/* --- PREMIUM SUCCESS TOAST --- */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed right-4 bottom-4 z-[90] w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-emerald-500/30 bg-background/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) sm:right-6 sm:bottom-6",
          showToast
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-95"
        )}
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="space-y-1 pt-0.5">
            <p className="text-base font-bold text-foreground leading-none">
              Message sent successfully
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Thanks for reaching out. An EstatePro advisor will follow up soon.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}