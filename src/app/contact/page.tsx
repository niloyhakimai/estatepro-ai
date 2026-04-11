import {
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight
} from "lucide-react"

import { ContactForm } from "@/components/contact/contact-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getIntentCopy(intent: string | undefined) {
  if (intent === "sell") {
    return {
      badge: "Seller Advisory",
      title: "List your property with EstatePro.",
      description:
        "Share your goals, timeline, and property details. Our elite team will craft a bespoke strategy to position your home perfectly in the market.",
    }
  }

  return {
    badge: "Contact Advisory",
    title: "Connect with our real estate experts.",
    description:
      "Whether you need help narrowing down neighborhoods, evaluating a premium listing, or planning your next investment, EstatePro is ready to assist.",
  }
}

const contactCards = [
  {
    title: "Headquarters",
    value: "1450 Harbor Avenue, Suite 320",
    description: "Visit by appointment for private buyer consultations and seller strategy sessions.",
    icon: MapPin,
  },
  {
    title: "Direct Line",
    value: "+1 (415) 555-0148",
    description: "Call for priority tour scheduling, listing questions, or active buyer support.",
    icon: Phone,
  },
  {
    title: "Email Support",
    value: "hello@estatepro.com",
    description: "Reach us for general inquiries, partnership requests, and market guidance.",
    icon: Mail,
  },
]

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams
  const intentValue = resolvedSearchParams.intent
  const intent =
    typeof intentValue === "string" ? intentValue.toLowerCase() : undefined
  const copy = getIntentCopy(intent)

  return (
    <div className="pb-24 transition-colors duration-500">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Office Interior"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-md transition-colors duration-500 dark:bg-slate-950/90" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-primary/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md dark:bg-primary/20">
                {copy.badge}
              </Badge>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 transition-colors dark:text-white sm:text-5xl lg:text-[4rem]">
                {copy.title}
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70 sm:text-xl">
                {copy.description}
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-8 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
              <p className="mb-6 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                <span className="flex size-2 rounded-full bg-primary" />
                Response Expectations
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.02] px-5 py-4 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                  <span className="text-sm font-bold text-slate-600 dark:text-white/60">Email reply</span>
                  <span className="text-sm font-black text-primary">Same business day</span>
                </div>
                <div className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.02] px-5 py-4 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                  <span className="text-sm font-bold text-slate-600 dark:text-white/60">Call scheduling</span>
                  <span className="text-sm font-black text-primary">Within 2 hours</span>
                </div>
              </div>
              <p className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-4 text-sm font-medium leading-relaxed text-slate-700 dark:bg-primary/20 dark:text-white/80">
                EstatePro supports buyers, sellers, and investors with a highly responsive and structured communication flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-8 w-full max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        
        {/* --- CONTACT INFO CARDS --- */}
        <div className="grid gap-6 lg:grid-cols-3">
          {contactCards.map(({ description, icon: Icon, title, value }) => (
            <Card key={title} className="group overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-black/40 dark:hover:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
              <CardContent className="space-y-6 p-8">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-primary/20 dark:group-hover:text-black">
                  <Icon className="size-6" />
                </span>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-slate-900 transition-colors dark:text-white">{title}</h2>
                  <p className="text-base font-black text-primary">{value}</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-600 transition-colors dark:text-white/70">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- FORM & SIDEBAR SECTION --- */}
        <div className="grid items-start gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          
          <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
            <CardHeader className="border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
              <Badge variant="secondary" className="mb-4 w-fit bg-primary/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
                Direct Inquiry
              </Badge>
              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Send a secure message</CardTitle>
              <p className="mt-2 max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
                Share your question securely and we will route it directly to the right EstatePro advisor for immediate review.
              </p>
            </CardHeader>
            <CardContent className="p-8 sm:p-10">
              <ContactForm />
            </CardContent>
          </Card>

          <aside className="sticky top-28 space-y-6">
            <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-lg backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40">
              <CardContent className="space-y-5 p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-[1.15rem] border border-black/5 bg-black/5 text-primary transition-colors dark:border-white/10 dark:bg-white/5">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Office Hours
                  </h2>
                  <div className="space-y-3 text-sm font-medium text-slate-600 dark:text-white/70">
                    <p className="flex justify-between rounded-xl border border-black/5 bg-black/[0.02] px-4 py-2 dark:border-white/5 dark:bg-white/[0.02]">
                      <span>Mon - Fri</span> <span className="font-bold text-slate-900 dark:text-white">8:00 AM - 6:00 PM</span>
                    </p>
                    <p className="flex justify-between rounded-xl border border-black/5 bg-black/[0.02] px-4 py-2 dark:border-white/5 dark:bg-white/[0.02]">
                      <span>Saturday</span> <span className="font-bold text-slate-900 dark:text-white">10:00 AM - 3:00 PM</span>
                    </p>
                    <p className="flex justify-between rounded-xl border border-black/5 bg-black/[0.02] px-4 py-2 dark:border-white/5 dark:bg-white/[0.02]">
                      <span>Sunday</span> <span className="font-bold text-slate-500 dark:text-white/50">Closed</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-lg backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40">
              <CardContent className="space-y-5 p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-[1.15rem] border border-black/5 bg-black/5 text-primary transition-colors dark:border-white/10 dark:bg-white/5">
                  <Building2 className="size-5" />
                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Information to Include
                  </h2>
                  <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-white/70">
                    <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]">
                      <ArrowRight className="size-4 shrink-0 text-primary" />
                      Your preferred luxury neighborhoods
                    </li>
                    <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]">
                      <ArrowRight className="size-4 shrink-0 text-primary" />
                      Target investment budget
                    </li>
                    <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-black/[0.02] px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]">
                      <ArrowRight className="size-4 shrink-0 text-primary" />
                      Buying, selling, or investing intent
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary/5 shadow-lg backdrop-blur-xl transition-colors duration-500 dark:bg-primary/10">
              <CardContent className="space-y-4 p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-[1.15rem] border border-primary/20 bg-primary/20 text-primary">
                  <Send className="size-5" />
                </span>
                <div>
                  <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    What happens next
                  </h2>
                  <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-white/80">
                    Once you submit the form, an elite EstatePro advisor will review
                    your note and follow up with the next best recommendation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>

        </div>
      </div>
    </div>
  )
}