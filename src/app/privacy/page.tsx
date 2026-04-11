import Link from "next/link"
import { FileText, LockKeyhole, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const privacySections = [
  {
    title: "Information We Collect",
    content: [
      "EstatePro may collect information you provide directly, including your name, email address, phone number, account details, property inquiry messages, and profile information.",
      "We may also collect platform usage information such as the pages you visit, filters you apply, and general interaction patterns that help us improve search quality and product performance.",
    ],
  },
  {
    title: "How We Use Information",
    content: [
      "We use the information we collect to operate the platform, respond to inquiries, personalize the search experience, improve listing discovery, and communicate with you about properties or support requests.",
      "Information may also be used to analyze platform performance, understand feature adoption, and maintain product quality, reliability, and security.",
    ],
  },
  {
    title: "Sharing and Disclosure",
    content: [
      "EstatePro does not sell personal information. We may share limited information with service providers, infrastructure partners, or trusted real estate partners when needed to operate the platform or respond to your request.",
      "We may also disclose information when required to comply with applicable law, legal process, or to protect the rights, safety, and security of EstatePro, our users, or the public.",
    ],
  },
  {
    title: "Data Security and Retention",
    content: [
      "We apply reasonable administrative and technical measures to protect personal information against unauthorized access, loss, misuse, or alteration. No online system can guarantee absolute security, but we design EstatePro with practical safeguards in mind.",
      "We retain information only as long as it is reasonably necessary for platform operations, account management, legal compliance, dispute resolution, and service improvement.",
    ],
  },
  {
    title: "Your Choices",
    content: [
      "You may update certain account details through your dashboard profile settings, including your name, bio, and phone number. You may also contact us if you need help with account or privacy-related questions.",
      "If you prefer not to receive non-essential communications, you can limit future outreach by contacting our support team directly.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 animate-in fade-in duration-700 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
          <CardContent className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-primary/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
                Privacy Policy
              </Badge>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                How EstatePro handles platform, profile, and inquiry data.
              </h1>
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate-600 dark:text-white/70">
                This page explains, in a clear and readable format, how we
                collect, use, and protect information across the EstatePro
                experience.
              </p>
            </div>

            <div className="space-y-3 rounded-[2rem] border border-black/5 bg-black/[0.02] p-6 shadow-inner transition-colors dark:border-white/5 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3 rounded-[1.15rem] border border-black/5 bg-white/60 px-4 py-3.5 shadow-sm transition-colors dark:border-white/10 dark:bg-black/40">
                <FileText className="size-4 shrink-0 text-primary" />
                <span className="text-xs font-bold leading-tight text-slate-600 dark:text-white/60">
                  Last updated: April 8, 2026
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[1.15rem] border border-black/5 bg-white/60 px-4 py-3.5 shadow-sm transition-colors dark:border-white/10 dark:bg-black/40">
                <ShieldCheck className="size-4 shrink-0 text-primary" />
                <span className="text-xs font-bold leading-tight text-slate-600 dark:text-white/60">
                  Applies to EstatePro web experiences and account tools
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[1.15rem] border border-black/5 bg-white/60 px-4 py-3.5 shadow-sm transition-colors dark:border-white/10 dark:bg-black/40">
                <LockKeyhole className="size-4 shrink-0 text-primary" />
                <span className="text-xs font-bold leading-tight text-slate-600 dark:text-white/60">
                  Questions can be directed to our support team at any time
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- POLICY DETAILS SECTION --- */}
        <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
          <CardHeader className="space-y-4 border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
            <Badge variant="secondary" className="w-fit bg-primary/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
              Policy Details
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              A practical overview of our privacy commitments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8 sm:p-10">
            {privacySections.map((section, index) => (
              <div key={section.title} className="space-y-4">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-4xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {index < privacySections.length - 1 ? (
                  <Separator className="bg-black/5 dark:bg-white/10" />
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* --- CONTACT / FOOTER SECTION --- */}
        <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
          <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Questions about privacy or account information?
              </h2>
              <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
                If you need help with account details, inquiry records, or any
                privacy-related concern, our team is available to help.
              </p>
            </div>
            <Button 
              asChild 
              className="h-12 shrink-0 rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
            >
              <Link href="/contact">Contact EstatePro</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </section>
  )
}