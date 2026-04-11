import { BarChart3, Building2, MapPin, MessageSquareMore } from "lucide-react"

import { AdminInquiriesChart } from "@/components/dashboard/admin-inquiries-chart"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { Badge } from "@/components/ui/badge"
import { CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function ManagerOverviewPage() {
  const [totalProperties, activeListings, totalInquiries, locationRows, propertyRows] =
    await prisma.$transaction([
      prisma.property.count(),
      prisma.property.count({ where: { isAvailable: true } }),
      prisma.inquiry.count(),
      prisma.property.findMany({
        distinct: ["location"],
        select: {
          location: true,
        },
      }),
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
    inquiries: property._count.inquiries,
    title: property.title,
  }))

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col gap-2 px-1">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Portfolio Overview
        </h2>
        <p className="text-base font-medium text-slate-600 dark:text-white/70">
          Track property performance and buyer engagement across your assigned markets.
        </p>
      </div>

      {/* --- UNIFIED STAT CARDS BLOCK --- */}
      <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_28px_90px_-54px_rgba(0,0,0,0.8)]">
        <div className="grid divide-y divide-black/5 dark:divide-white/10 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <DashboardStatCard
            label="Total Properties"
            value={String(totalProperties)}
            description="Catalog of listings under management."
            icon={Building2}
            className="rounded-none border-none bg-transparent shadow-none transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
          />
          <DashboardStatCard
            label="Active Listings"
            value={String(activeListings)}
            description="Properties live in the Explore catalog."
            icon={BarChart3}
            className="rounded-none border-none bg-transparent shadow-none transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
          />
          <DashboardStatCard
            label="Total Inquiries"
            value={String(totalInquiries)}
            description="Buyer messages needing attention."
            icon={MessageSquareMore}
            className="rounded-none border-none bg-transparent shadow-none transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
          />
          <DashboardStatCard
            label="Markets Covered"
            value={String(locationRows.length)}
            description="Distinct cities in active inventory."
            icon={MapPin}
            className="rounded-none border-none bg-transparent shadow-none transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
          />
        </div>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary dark:bg-primary/20">
              Manager Overview
            </Badge>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Inquiry momentum by property
            </CardTitle>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/60">
              Review which listings are generating the strongest buyer interest so your team can prioritize follow-up.
            </p>
          </div>
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] border border-black/5 bg-black/5 text-primary dark:border-white/10 dark:bg-white/5 sm:flex">
            <BarChart3 className="size-6" />
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-black/5 bg-white/60 p-6 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)] sm:p-10">
          <AdminInquiriesChart data={chartData} />
        </div>
      </div>
      
    </div>
  )
}