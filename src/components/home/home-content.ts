import type { LucideIcon } from "lucide-react"
import {
  Building2,
  ContactRound,
  Home,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react"

export type Stat = {
  label: string
  value: string
}

export type Category = {
  count: string
  description: string
  href: string
  icon: LucideIcon
  image: string // Added image for premium UI
  title: string
}

export type Service = {
  description: string
  icon: LucideIcon
  title: string
}

export type Testimonial = {
  initials: string
  name: string
  quote: string
  role: string
  avatar: string // Added avatar image
}

export const homeStats: Stat[] = [
  { value: "$2.5B+", label: "Property Sales Volume" },
  { value: "150+", label: "Verified Elite Agents" },
  { value: "35", label: "Global Cities Covered" },
  { value: "4.9/5", label: "Average Client Rating" },
]

export const categories: Category[] = [
  {
    title: "Luxury Apartments",
    count: "Urban-ready homes",
    description:
      "Smart layouts, breathtaking city views, and easy access to premium dining and business districts.",
    href: "/explore?bedrooms=2plus",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Exclusive Villas",
    count: "Signature listings",
    description:
      "Resort-style living with private pools, generous outdoor space, and standout privacy.",
    href: "/explore?price=over-2m",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
  },
  {
    title: "Premium Condos",
    count: "Concierge-style living",
    description:
      "Design-forward residences for buyers who value convenience, walkability, and polished common spaces.",
    href: "/explore?price=500k-1m",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Family Estates",
    count: "Move-in ready picks",
    description:
      "Comfortable floor plans, sprawling gardens, and neighborhoods designed for absolute everyday ease.",
    href: "/explore?bedrooms=3plus",
    icon: Home,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
  },
]

export const services: Service[] = [
  {
    title: "Strategic Buying",
    icon: ShieldCheck,
    description:
      "Compare neighborhoods, off-market pricing, and timing with a clear strategy before you even schedule your first tour.",
  },
  {
    title: "Premium Selling",
    icon: TrendingUp,
    description:
      "Position your home with cinematic presentation, data-driven pricing, and direct access to pre-qualified buyers.",
  },
  {
    title: "Executive Rentals",
    icon: ContactRound,
    description:
      "Find professionally vetted luxury rentals and let our concierge team handle the negotiations and paperwork.",
  },
]

export const testimonials: Testimonial[] = [
  {
    initials: "AL",
    name: "Ariana Lopez",
    role: "Tech Executive, San Francisco",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    quote:
      "EstatePro completely changed how I view real estate. Their AI search found exactly what I wanted in seconds, and the closing was incredibly smooth.",
  },
  {
    initials: "JM",
    name: "James Morgan",
    role: "Real Estate Investor, Austin",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
    quote:
      "The level of curation here is unmatched. I don't waste time scrolling through irrelevant listings anymore. It’s tailored, sharp, and highly professional.",
  },
  {
    initials: "SK",
    name: "Sara Khan",
    role: "First-time buyer, New York",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    quote:
      "What stands out is the transparency. From pricing to neighborhood insights, I felt supported and confident making the biggest purchase of my life.",
  },
]

export const faqs = [
  {
    question: "How do I schedule a private property tour?",
    answer:
      "You can start from any featured listing or use our AI search form. Once you share your preferred area, an elite advisor will coordinate a private tour at your convenience.",
  },
  {
    question: "Are your listings verified before they go live?",
    answer:
      "Absolutely. We prioritize presentation-ready inventory. Every property undergoes a rigorous 50-point inspection covering pricing alignment, legal disclosures, and physical condition.",
  },
  {
    question: "Do you offer support for international investors?",
    answer:
      "Yes, we have a dedicated desk for international buyers. We handle remote video tours, cross-border financing guidance, and legal coordination to make remote purchasing seamless.",
  },
  {
    question: "How accurate is the AI-assisted search?",
    answer:
      "Our natural-language AI connects directly to live market data in milliseconds. It interprets complex requests (e.g., 'Modern 4-bed near good schools under $2M') with over 98% accuracy.",
  },
  {
    question: "What happens after I submit a contact request?",
    answer:
      "A senior advisor will reach out within 15 minutes during business hours. We'll confirm your priorities and outline a clear, no-pressure roadmap for your real estate goals.",
  },
]