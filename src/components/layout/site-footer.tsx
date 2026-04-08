import Link from "next/link"
import {
  CirclePlay,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Building2,
  Home
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { SiteLogo } from "./site-logo"

const internalLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Properties", href: "/explore" },
  { label: "About EstatePro", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
]

const accountLinks = [
  { label: "Create Account", href: "/register" },
  { label: "Client Dashboard", href: "/dashboard" },
  { label: "Sell With EstatePro", href: "/contact?intent=sell" },
  { label: "Newest Arrivals", href: "/explore?sort=newest" },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Globe },
  { label: "Instagram", href: "https://www.instagram.com", icon: MessageSquare },
  { label: "X", href: "https://x.com", icon: Send },
  { label: "YouTube", href: "https://www.youtube.com", icon: CirclePlay },
]

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string
  label: string
  external?: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <span className="relative flex items-center">
        <span className="absolute -left-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:left-0 text-primary">
          ›
        </span>
        <span className="transition-transform duration-300 group-hover:translate-x-3">
          {label}
        </span>
      </span>
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/30 bg-background overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 dark:to-primary/10" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <SiteLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Elevating the standard of property discovery. We provide verified inventory, faster responses, and a premium real estate experience.
            </p>

            <div className="rounded-2xl border border-border/50 bg-secondary/30 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">
                <span className="flex size-2 rounded-full bg-primary" />
                Contact Office
              </p>
              <div className="space-y-4 text-sm font-medium text-muted-foreground">
                <a
                  href="https://maps.google.com/?q=1450+Harbor+Avenue+Suite+320+San+Diego+CA+92101"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 transition-colors hover:text-foreground"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5" />
                  <span>1450 Harbor Avenue, Suite 320<br />San Diego, CA 92101</span>
                </a>
                <a
                  href="mailto:hello@estatepro.com"
                  className="group flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-primary transition-transform group-hover:scale-110" />
                  hello@estatepro.com
                </a>
                <a
                  href="tel:+14155550148"
                  className="group flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0 text-primary transition-transform group-hover:rotate-12" />
                  +1 (415) 555-0148
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="space-y-6 lg:pl-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Navigation
            </h2>
            <div className="flex flex-col gap-4">
              {internalLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          {/* Account Links Column */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Client Portal
            </h2>
            <div className="flex flex-col gap-4">
              {accountLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          {/* Social & Hours Column */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Connect With Us
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Follow for exclusive off-market updates, design inspiration, and market insights.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group inline-flex size-11 items-center justify-center rounded-xl border border-border/60 bg-background text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-md"
                >
                  <Icon className="size-4 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
            
            <Separator className="my-6 border-border/40" />
            
            <div className="space-y-3 rounded-xl bg-secondary/20 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">Office Hours</p>
              <div className="space-y-1 text-sm font-medium text-muted-foreground">
                <p>Mon - Fri: 8:00 AM – 6:00 PM</p>
                <p>Sat - Sun: 10:00 AM – 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-6 pt-8 border-t border-border/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Home className="size-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              © {new Date().getFullYear()} EstatePro Luxury Real Estate. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Privacy & Legal
            </Link>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Building2 className="size-4" />
              Equal Housing Opportunity
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}