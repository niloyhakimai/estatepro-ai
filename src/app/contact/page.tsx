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
    <div className="pb-24">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative flex min-h-[55vh] items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Office Interior"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="accent" className="bg-primary/10 text-primary border-primary/20 py-1.5 px-4 shadow-sm backdrop-blur-md">
                {copy.badge}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
                {copy.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {copy.description}
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-border/40 bg-background/60 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-primary/30">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6">
                <span className="flex size-2 rounded-full bg-primary" />
                Response Expectations
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-5 py-4 shadow-sm">
                  <span className="text-sm font-medium text-muted-foreground">Email reply</span>
                  <span className="font-bold text-primary">Same business day</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-5 py-4 shadow-sm">
                  <span className="text-sm font-medium text-muted-foreground">Call scheduling</span>
                  <span className="font-bold text-primary">Within 2 hours</span>
                </div>
              </div>
              <p className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-foreground/80">
                EstatePro supports buyers, sellers, and investors with a highly responsive and structured communication flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 -mt-8 relative z-20">
        
        {/* --- CONTACT INFO CARDS --- */}
        <div className="grid gap-6 lg:grid-cols-3">
          {contactCards.map(({ description, icon: Icon, title, value }) => (
            <Card key={title} className="group overflow-hidden border-border/40 bg-background/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 rounded-[2rem]">
              <CardContent className="p-8 space-y-6">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                  <p className="text-base font-semibold text-primary">{value}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- FORM & SIDEBAR SECTION --- */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] items-start pt-8 border-t border-border/30">
          
          <Card className="border-border/40 bg-background/60 shadow-2xl backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-secondary/20 p-8 border-b border-border/30">
              <Badge variant="outline" className="w-fit mb-4 bg-background">
                Direct Inquiry
              </Badge>
              <CardTitle className="text-3xl font-bold">Send a secure message</CardTitle>
              <p className="text-base leading-relaxed text-muted-foreground mt-2">
                Share your question securely and we will route it directly to the right EstatePro advisor for immediate review.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>

          <aside className="space-y-6 sticky top-28">
            <Card className="border-border/40 bg-background/80 shadow-lg backdrop-blur-sm rounded-[2rem]">
              <CardContent className="p-6 space-y-5">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Office Hours
                  </h2>
                  <div className="space-y-2 text-sm font-medium text-muted-foreground">
                    <p className="flex justify-between"><span>Mon - Fri</span> <span className="text-foreground">8:00 AM - 6:00 PM</span></p>
                    <p className="flex justify-between"><span>Saturday</span> <span className="text-foreground">10:00 AM - 3:00 PM</span></p>
                    <p className="flex justify-between"><span>Sunday</span> <span className="text-foreground">Closed</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-background/80 shadow-lg backdrop-blur-sm rounded-[2rem]">
              <CardContent className="p-6 space-y-5">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Information to Include
                  </h2>
                  <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                    <li className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 px-4 py-3">
                      <ArrowRight className="size-4 shrink-0 text-primary mt-0.5" />
                      Your preferred luxury neighborhoods or cities
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 px-4 py-3">
                      <ArrowRight className="size-4 shrink-0 text-primary mt-0.5" />
                      Target investment budget and timeline
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 px-4 py-3">
                      <ArrowRight className="size-4 shrink-0 text-primary mt-0.5" />
                      Whether you are buying, selling, or investing
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-gradient-to-br from-primary/10 to-transparent shadow-lg backdrop-blur-sm rounded-[2rem]">
              <CardContent className="p-6 space-y-4">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Send className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    What happens next
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/80">
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