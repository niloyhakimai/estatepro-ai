"use client"

import Link from "next/link"
import {
  Building2,
  CirclePlay,
  Globe,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { SiteLogo } from "./site-logo"

const internalLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Properties" },
  { href: "/about", label: "About EstatePro" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
]

const accountLinks = [
  { href: "/register", label: "Create Account" },
  { href: "/dashboard", label: "Client Dashboard" },
  { href: "/contact?intent=sell", label: "Sell With EstatePro" },
  { href: "/explore?sort=newest", label: "Newest Arrivals" },
]

const socialLinks = [
  { href: "https://www.linkedin.com", icon: Globe, label: "LinkedIn" },
  { href: "https://www.instagram.com", icon: MessageSquare, label: "Instagram" },
  { href: "https://x.com", icon: Send, label: "X" },
  { href: "https://www.youtube.com", icon: CirclePlay, label: "YouTube" },
]

function FooterLink({
  external = false,
  href,
  label,
}: {
  external?: boolean
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="text-primary/70 transition-transform duration-200 group-hover:translate-x-0.5">
        {">"}
      </span>
      <span>{label}</span>
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-black/5 bg-white/60 shadow-[0_-26px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_-26px_90px_-54px_rgba(0,0,0,0.8)]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-10 sm:py-12 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-6">
            <SiteLogo />
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Elevating the standard of property discovery with verified inventory,
              faster responses, and a premium real estate experience built for clarity.
            </p>

            <div className="rounded-[1.5rem] border border-black/5 bg-black/[0.03] p-5 transition-colors dark:border-white/10 dark:bg-white/[0.04]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Contact Office
              </p>
              <div className="space-y-4 text-sm text-muted-foreground">
                <a
                  href="https://maps.google.com/?q=1450+Harbor+Avenue+Suite+320+San+Diego+CA+92101"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-foreground"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    1450 Harbor Avenue, Suite 320
                    <br />
                    San Diego, CA 92101
                  </span>
                </a>
                <a
                  href="mailto:hello@estatepro.com"
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-primary" />
                  <span>hello@estatepro.com</span>
                </a>
                <a
                  href="tel:+14155550148"
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  <span>+1 (415) 555-0148</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Navigation
            </h2>
            <div className="flex flex-col gap-3">
              {internalLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Client Portal
            </h2>
            <div className="flex flex-col gap-3">
              {accountLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Connect With Us
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Follow for exclusive off-market updates, design inspiration, and market
              insight.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-2xl border border-black/5 bg-black/[0.03] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:text-primary dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-primary/20 dark:hover:text-primary"
                >
                  <Icon className="size-4 shrink-0" />
                </Link>
              ))}
            </div>

            <Separator className="bg-black/10 dark:bg-white/10" />

            <div className="rounded-[1.35rem] border border-black/5 bg-black/[0.03] p-4 transition-colors dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Office Hours
              </p>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 py-6 text-sm text-muted-foreground transition-colors dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Home className="size-4 shrink-0 text-primary" />
            <p>Copyright {new Date().getFullYear()} EstatePro Luxury Real Estate.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy & Legal
            </Link>
            <div className="flex items-center gap-2">
              <Building2 className="size-4 shrink-0" />
              <span>Equal Housing Opportunity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}