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
  image: string
  title: string
}

export type Service = {
  description: string
  icon: LucideIcon
  title: string
}

export type Testimonial = {
  avatar: string
  initials: string
  name: string
  quote: string
  role: string
}

export const homeStats: Stat[] = [
  { value: "$4.2B+", label: "Secured Transaction Volume" },
  { value: "300+", label: "Exclusive Curated Properties" },
  { value: "12", label: "Global Ultra-Prime Markets" },
  { value: "99.8%", label: "Client Satisfaction Rate" },
]

export const categories: Category[] = [
  {
    title: "Skyline Penthouses",
    count: "Ultra-Luxury",
    description:
      "Command the city from above. Unmatched panoramic views, bespoke interior finishes, and absolute privacy at the apex of urban living.",
    href: "/explore?bedrooms=2plus&type=penthouse",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Architectural Villas",
    count: "Signature Estates",
    description:
      "Masterpieces of modern design. Resort-style amenities seamlessly integrated into breathtaking natural landscapes and secluded environments.",
    href: "/explore?price=over-2m&type=villa",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
  },
  {
    title: "Executive Residences",
    count: "Turnkey Elegance",
    description:
      "Sophisticated, low-maintenance living. Featuring white-glove concierge services, private elevators, and state-of-the-art smart home integration.",
    href: "/explore?price=500k-1m&type=residence",
    icon: TrendingUp,
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Heritage Manors",
    count: "Legacy Properties",
    description:
      "Timeless architecture meets contemporary comfort. Sprawling grounds, historical significance, and unparalleled craftsmanship for generations.",
    href: "/explore?bedrooms=3plus&type=manor",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
  },
]

export const services: Service[] = [
  {
    title: "Discreet Acquisition",
    icon: ShieldCheck,
    description:
      "Gain access to off-market inventory and highly guarded listings. We negotiate on your behalf with absolute confidentiality and precision.",
  },
  {
    title: "Global Portfolio Management",
    icon: TrendingUp,
    description:
      "Optimize your real estate assets across borders. We provide data-driven market analysis to maximize yield and portfolio valuation.",
  },
  {
    title: "Private Client Concierge",
    icon: ContactRound,
    description:
      "Beyond the transaction. From bespoke interior design coordination to securing luxury short-term executive rentals, we manage the details.",
  },
]

export const testimonials: Testimonial[] = [
  {
    initials: "MW",
    name: "Marcus Winslow",
    role: "CEO, Global Equities",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
    quote:
      "EstatePro redefined the acquisition process for me. Their discretion is absolute, and their ability to surface off-market architectural gems is simply unmatched in this industry.",
  },
  {
    initials: "EC",
    name: "Elena Croft",
    role: "Venture Capitalist",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    quote:
      "The interface is as sharp as their advisory team. I don't have time for noise. EstatePro delivers curated, high-fidelity data that allows me to make fast, confident investment decisions.",
  },
  {
    initials: "JD",
    name: "Jonathan & Diana Reed",
    role: "Private Collectors",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    quote:
      "Finding a legacy estate requires more than a search bar—it requires an understanding of nuance. The level of white-glove service we received from discovery to closing was exceptional.",
  },
]

export const faqs = [
  {
    question: "How do I gain access to private, off-market listings?",
    answer:
      "Off-market inventory is exclusive to our registered private clients. Once you complete our discreet onboarding process, your dedicated advisor will curate a secure portfolio of properties that align strictly with your acquisition criteria.",
  },
  {
    question: "What is the vetting process for properties listed on EstatePro?",
    answer:
      "We maintain a highly exclusive inventory. Every property is subjected to a rigorous 50-point inspection by our internal team, ensuring architectural integrity, legal clarity, and alignment with luxury market standards.",
  },
  {
    question: "Do you facilitate cross-border transactions and international financing?",
    answer:
      "Absolutely. Our Global Desk specializes in international acquisitions, coordinating seamlessly with top-tier legal counsel, tax advisors, and private wealth institutions to ensure a frictionless remote closing.",
  },
  {
    question: "How does the AI-driven property curation work?",
    answer:
      "Our proprietary AI analyzes live, high-fidelity market data against your specific lifestyle and investment parameters. It surfaces hidden opportunities and predicts market shifts, ensuring you only view listings with high relevance and potential.",
  },
  {
    question: "What is the next step after I request an advisory consultation?",
    answer:
      "A Senior Partner will contact you within 15 minutes via your preferred secure channel. This initial conversation focuses entirely on understanding your portfolio goals, with zero obligation to proceed.",
  },
]