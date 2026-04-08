import { BarChart3, Building2, MapPin, MessageSquareMore } from "lucide-react"

import { AdminInquiriesChart } from "@/components/dashboard/admin-inquiries-chart"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Total Properties"
          value={String(totalProperties)}
          description="The current catalog of listings under management across EstatePro."
          icon={Building2}
        />
        <DashboardStatCard
          label="Active Listings"
          value={String(activeListings)}
          description="Properties that are live and visible in the Explore experience."
          icon={BarChart3}
        />
        <DashboardStatCard
          label="Total Inquiries"
          value={String(totalInquiries)}
          description="Buyer messages that need attention across the property portfolio."
          icon={MessageSquareMore}
        />
        <DashboardStatCard
          label="Markets Covered"
          value={String(locationRows.length)}
          description="Distinct cities currently represented in the active real estate inventory."
          icon={MapPin}
        />
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            Manager Overview
          </Badge>
          <CardTitle className="text-3xl">Inquiry momentum by property</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            Review which listings are generating the strongest buyer interest so your team can prioritize follow-up.
          </p>
        </CardHeader>
        <CardContent>
          <AdminInquiriesChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}
