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
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          System Overview
        </h2>
        <p className="text-base text-slate-600 font-medium dark:text-white/70">
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
          className="border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] dark:hover:border-white/20 dark:hover:bg-black/60 rounded-[2rem]"
        />
        <DashboardStatCard
          label="Active Listings"
          value={String(activeListings)}
          description="Ready for buyer inquiries."
          icon={TrendingUp}
          className="border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] dark:hover:border-white/20 dark:hover:bg-black/60 rounded-[2rem]"
        />
        <DashboardStatCard
          label="Total Inquiries"
          value={String(totalInquiries)}
          description="Engagement recorded platform-wide."
          icon={MessageSquareMore}
          className="border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] dark:hover:border-white/20 dark:hover:bg-black/60 rounded-[2rem]"
        />
        <DashboardStatCard
          label="Registered Users"
          value={String(totalUsers)}
          description="Member accounts and VIP investors."
          icon={Users}
          className="border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)] dark:hover:border-white/20 dark:hover:bg-black/60 rounded-[2rem]"
        />
      </div>

      {/* --- CHART SECTION --- */}
      <Card className="border border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl rounded-[2.5rem] transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)] overflow-hidden">
        <CardHeader className="p-8 pb-4 space-y-4 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Badge variant="secondary" className="bg-primary/10 text-[0.65rem] uppercase tracking-[0.2em] text-primary dark:bg-primary/20 shadow-sm mb-2 px-3 py-1.5">
                Performance Analytics
              </Badge>
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Market Interest Distribution</CardTitle>
            </div>
            <div className="h-12 w-12 rounded-2xl border border-black/5 bg-black/5 flex items-center justify-center text-primary dark:border-white/10 dark:bg-white/5">
              <BarChart3 className="size-6" />
            </div>
          </div>
          <p className="text-base leading-relaxed text-slate-600 dark:text-white/70 max-w-2xl">
            This graph tracks which elite properties are currently attracting the highest volume of buyer attention. Use this data to optimize listing visibility and agent assignments.
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="rounded-[2rem] border border-black/5 bg-black/[0.02] p-6 sm:p-10 transition-colors dark:border-white/5 dark:bg-white/[0.02]">
            <AdminInquiriesChart data={chartData} />
          </div>
        </CardContent>
      </Card>

      {/* --- FOOTER BANNER --- */}
      <div className="rounded-[2rem] border border-primary/10 bg-gradient-to-r from-primary/5 to-transparent p-8 transition-colors duration-500 dark:border-primary/20 dark:from-primary/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.2em]">Administrator Note</p>
            <p className="text-sm text-slate-600 font-medium dark:text-white/70">
              Data is refreshed every 5 minutes to ensure accurate reporting for elite clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}