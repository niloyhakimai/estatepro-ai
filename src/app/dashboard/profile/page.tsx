import { BadgeCheck, FileText, Mail, Phone, ShieldCheck, UserCircle } from "lucide-react"

import { requireDashboardSession } from "@/components/dashboard/dashboard-auth"
import { ProfileSettingsForm } from "@/components/dashboard/profile-settings-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

export default async function DashboardProfilePage() {
  const session = await requireDashboardSession("/dashboard/profile")
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      bio: true,
      email: true,
      name: true,
      phone: true,
      role: true,
    },
  })

  return (
    <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 xl:grid-cols-[minmax(0,1fr)_24rem]">
      
      {/* --- SETTINGS FORM CARD --- */}
      <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)]">
        <CardHeader className="border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
              Personal Identity
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Update your account</CardTitle>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
              Maintain your professional presence. Update your name, contact details, and biography to stay connected with the EstatePro network.
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8 sm:p-10">
          <ProfileSettingsForm
            bio={dbUser?.bio}
            name={dbUser?.name ?? session.user.name}
            phone={dbUser?.phone}
          />
        </CardContent>
      </Card>

      {/* --- ACCOUNT SUMMARY SIDEBAR --- */}
      <div className="space-y-6">
        <Card className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
          <CardHeader className="border-b border-black/5 bg-black/[0.02] p-6 transition-colors dark:border-white/10 dark:bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-[1.15rem] border border-black/5 bg-black/5 text-primary shadow-sm transition-colors dark:border-white/10 dark:bg-white/5">
                <UserCircle className="size-6" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1.5 bg-black/5 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest text-slate-500 shadow-none dark:bg-white/10 dark:text-white/50">
                  Verified Status
                </Badge>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Account Summary</CardTitle>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-5 p-6">
            {/* Contact Details List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.03] px-4 py-3.5 shadow-sm transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
                <span className="flex items-center gap-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">
                  <Mail className="size-3.5 text-primary" />
                  Email
                </span>
                <span className="max-w-[12rem] truncate text-sm font-bold text-slate-900 dark:text-white">
                  {dbUser?.email ?? session.user.email ?? "Private account"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.03] px-4 py-3.5 shadow-sm transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
                <span className="flex items-center gap-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">
                  <ShieldCheck className="size-3.5 text-primary" />
                  Privilege
                </span>
                <Badge className={cn(
                  "rounded-lg px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-widest shadow-none border",
                  dbUser?.role === "ADMIN" 
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400" 
                    : "bg-primary/10 text-primary border-primary/20 dark:text-primary"
                )}>
                  {dbUser?.role ?? session.user.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-[1.15rem] border border-black/5 bg-black/[0.03] px-4 py-3.5 shadow-sm transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
                <span className="flex items-center gap-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">
                  <Phone className="size-3.5 text-primary" />
                  Contact
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {dbUser?.phone ?? "Not added"}
                </span>
              </div>
            </div>

            {/* Bio Preview Box */}
            <div className="space-y-3 rounded-2xl border border-primary/10 bg-primary/5 p-5 dark:border-primary/20 dark:bg-primary/10">
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
                <FileText className="size-3.5" />
                Identity Bio
              </p>
              <p className="text-sm font-medium italic leading-relaxed text-slate-600 dark:text-white/70">
                &ldquo;{dbUser?.bio ?? "Share your story with the EstatePro community..."}&rdquo;
              </p>
            </div>

            {/* Platform Note */}
            <div className="space-y-2 rounded-2xl border border-black/5 bg-black/[0.02] p-5 transition-colors dark:border-white/5 dark:bg-white/[0.02]">
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                <BadgeCheck className="size-3.5 text-primary" />
                Universal Access
              </p>
              <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-white/50">
                This unified profile management system ensures your identity remains consistent across user, manager, and administrator dashboard environments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}