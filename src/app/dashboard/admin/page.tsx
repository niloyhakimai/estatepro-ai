import { BarChart3, Building2, MessageSquareMore, Users, TrendingUp } from "lucide-react"

import { AdminInquiriesChart } from "@/components/dashboard/admin-inquiries-chart"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { requireAdminSession } from "@/components/dashboard/dashboard-auth"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function AdminOverviewPage() {
  await requireAdminSession("/dashboard/admin")

  const [totalProperties, activeListings, totalInquiries, totalUsers, propertyRows] =
    await prisma.$transaction([
      prisma.property.count(),
      prisma.property.count({ where: { isAvailable: true } }),
      prisma.inquiry.count(),
      prisma.user.count(),
      prisma.property.findMany({
        orderBy: {
          inquiries: {
            _count: "desc",
          },
        },
        take: 6,
        select: {
          title: true,
          _count: {
            select: {
              inquiries: true,
            },
          },
        },
      }),
    ])

  const chartData = propertyRows.map((property) => ({
    title: property.title,
    inquiries: property._count.inquiries,
  }))

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          System Overview
        </h2>
        <p className="text-base text-muted-foreground font-medium">
          Real-time performance metrics and buyer engagement analytics.
        </p>
      </div>

      {/* --- STAT CARDS GRID --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          label="Total Properties"
          value={String(totalProperties)}
          description="Managed assets across all markets."
          icon={Building2}
          className="border-border/40 bg-background/60 shadow-lg backdrop-blur-md rounded-[2rem] transition-all hover:border-primary/30"
        />
        <DashboardStatCard
          label="Active Listings"
          value={String(activeListings)}
          description="Ready for buyer inquiries."
          icon={TrendingUp}
          className="border-border/40 bg-background/60 shadow-lg backdrop-blur-md rounded-[2rem] transition-all hover:border-primary/30"
        />
        <DashboardStatCard
          label="Total Inquiries"
          value={String(totalInquiries)}
          description="Engagement recorded platform-wide."
          icon={MessageSquareMore}
          className="border-border/40 bg-background/60 shadow-lg backdrop-blur-md rounded-[2rem] transition-all hover:border-primary/30"
        />
        <DashboardStatCard
          label="Registered Users"
          value={String(totalUsers)}
          description="Member accounts and VIP investors."
          icon={Users}
          className="border-border/40 bg-background/60 shadow-lg backdrop-blur-md rounded-[2rem] transition-all hover:border-primary/30"
        />
      </div>

      {/* --- CHART SECTION --- */}
      <Card className="border-border/40 bg-background/60 shadow-2xl backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 py-1 px-3 shadow-sm mb-2">
                Performance Analytics
              </Badge>
              <CardTitle className="text-2xl font-bold tracking-tight">Market Interest Distribution</CardTitle>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary">
              <BarChart3 className="size-6" />
            </div>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
            This graph tracks which elite properties are currently attracting the highest volume of buyer attention. Use this data to optimize listing visibility and agent assignments.
          </p>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="rounded-[2rem] border border-border/30 bg-secondary/10 p-6 sm:p-10 transition-all hover:bg-secondary/20">
            <AdminInquiriesChart data={chartData} />
          </div>
        </CardContent>
      </Card>

      {/* --- FOOTER BANNER --- */}
      <div className="rounded-[2rem] border border-primary/10 bg-gradient-to-r from-primary/5 to-transparent p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary uppercase tracking-widest">Administrator Note</p>
            <p className="text-sm text-muted-foreground font-medium">
              Data is refreshed every 5 minutes to ensure accurate reporting for elite clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}