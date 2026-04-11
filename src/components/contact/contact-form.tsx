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
              className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Full Name
            </Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Avery Morgan"
              autoComplete="name"
              required
              className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
            />
          </div>
          <div className="space-y-2.5">
            <Label 
              htmlFor="contact-email"
              className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
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
              className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <Label 
            htmlFor="contact-message"
            className="pl-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
          >
            Message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Tell us what you are looking for, your target area, timeline, or how our team can help."
            required
            className="min-h-[140px] resize-none rounded-[1.15rem] border-black/10 bg-white/50 p-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
          />
        </div>

        <p className="pl-1 text-sm font-medium leading-relaxed text-slate-500 dark:text-white/60">
          We typically respond within one business day for general questions,
          buyer support, and seller consultations.
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
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
          "pointer-events-none fixed bottom-4 right-4 z-[90] w-[calc(100vw-2rem)] max-w-sm rounded-[1.75rem] border border-black/5 bg-white/95 p-5 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] backdrop-blur-xl transition-all duration-500 ease-out dark:border-white/10 dark:bg-black/90 dark:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] sm:bottom-6 sm:right-6",
          showToast
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0"
        )}
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-colors dark:text-emerald-400">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="space-y-1 pt-0.5">
            <p className="text-base font-bold leading-none text-slate-900 dark:text-white">
              Message sent successfully
            </p>
            <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-white/70">
              Thanks for reaching out. An EstatePro advisor will follow up soon.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}