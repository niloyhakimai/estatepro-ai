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
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        <Card className="overflow-hidden">
          <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
            <div className="space-y-4">
              <Badge variant="accent" className="w-fit">
                Privacy Policy
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                How EstatePro handles platform, profile, and inquiry data.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                This page explains, in a clear and readable format, how we
                collect, use, and protect information across the EstatePro
                experience.
              </p>
            </div>

            <div className="space-y-3 rounded-[1.8rem] border border-border/70 bg-background/75 p-5 shadow-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-4 py-3">
                <FileText className="size-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Last updated: April 8, 2026
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-4 py-3">
                <ShieldCheck className="size-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Applies to EstatePro web experiences and account tools
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-4 py-3">
                <LockKeyhole className="size-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Questions can be directed to our support team at any time
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              Policy Details
            </Badge>
            <CardTitle className="text-3xl">
              A practical overview of our privacy commitments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {privacySections.map((section, index) => (
              <div key={section.title} className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {index < privacySections.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Questions about privacy or account information?
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                If you need help with account details, inquiry records, or any
                privacy-related concern, our team is available to help.
              </p>
            </div>
            <Button asChild className="rounded-2xl">
              <Link href="/contact">Contact EstatePro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
