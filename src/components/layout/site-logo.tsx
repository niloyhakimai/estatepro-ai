import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95", className)}>
      
      {/* --- Image Logo Container --- */}
      <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-[1.15rem] shadow-[0_16px_40px_-20px_rgba(15,118,110,0.7)] ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-[0_16px_40px_-15px_rgba(15,118,110,0.9)]">
        {/* Premium Architectural Image as Logo */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop"
          alt="EstatePro Logo Mark"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay to make it look like a brand mark */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-emerald-600/40 mix-blend-multiply" />
      </div>

      <span className="flex flex-col leading-none">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
          Luxury Real Estate
        </span>
        <span className="text-xl font-bold tracking-tight text-foreground">
          EstatePro
        </span>
      </span>
    </Link>
  );
}