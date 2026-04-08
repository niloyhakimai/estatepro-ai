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
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- SETTINGS FORM CARD --- */}
      <Card className="border-border/40 bg-background/60 backdrop-blur-xl rounded-[2.5rem] shadow-xl overflow-hidden">
        <CardHeader className="p-8 sm:p-10 border-b border-border/30 bg-secondary/10">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
              Personal Identity
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight">Update your account</CardTitle>
            <p className="max-w-2xl text-base text-muted-foreground font-medium leading-relaxed">
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
        <Card className="border-border/40 bg-background/60 backdrop-blur-xl rounded-[2rem] shadow-lg overflow-hidden">
          <CardHeader className="p-6 border-b border-border/30 bg-secondary/5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserCircle className="size-5" />
              </div>
              <div>
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest mb-1">
                  Verified Status
                </Badge>
                <CardTitle className="text-xl font-bold">Account Summary</CardTitle>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-4">
            {/* Contact Details List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 px-4 py-3 shadow-sm transition-all hover:bg-background/80">
                <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Mail className="size-3.5 text-primary" />
                  Email
                </span>
                <span className="text-sm font-bold text-foreground truncate max-w-[12rem]">
                  {dbUser?.email ?? session.user.email ?? "Private account"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 px-4 py-3 shadow-sm transition-all hover:bg-background/80">
                <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <ShieldCheck className="size-3.5 text-primary" />
                  Privilege
                </span>
                <Badge className={cn(
                  "rounded-lg text-[10px] font-black uppercase tracking-tighter",
                  dbUser?.role === "ADMIN" ? "bg-amber-500/10 text-amber-600" : "bg-primary/10 text-primary"
                )}>
                  {dbUser?.role ?? session.user.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 px-4 py-3 shadow-sm transition-all hover:bg-background/80">
                <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Phone className="size-3.5 text-primary" />
                  Contact
                </span>
                <span className="text-sm font-bold text-foreground">
                  {dbUser?.phone ?? "Not added"}
                </span>
              </div>
            </div>

            {/* Bio Preview Box */}
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5 space-y-3">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                <FileText className="size-4 text-primary" />
                Identity Bio
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground italic font-medium">
                "{dbUser?.bio ?? "Share your story with the EstatePro community..."}"
              </p>
            </div>

            {/* Platform Note */}
            <div className="rounded-2xl border border-border/40 bg-secondary/20 p-5 space-y-2">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                <BadgeCheck className="size-4 text-primary" />
                Universal Access
              </p>
              <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
                This unified profile management system ensures your identity remains consistent across user, manager, and administrator dashboard environments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}