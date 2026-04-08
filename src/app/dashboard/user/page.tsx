import { Building2, MapPin, MessageSquareMore } from "lucide-react"

import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { requireUserSession } from "@/components/dashboard/dashboard-auth"
import { UserInterestChart } from "@/components/dashboard/user-interest-chart"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function UserOverviewPage() {
  const session = await requireUserSession("/dashboard/user")

  const inquiries = await prisma.inquiry.findMany({
    where: { userId: session.user.id },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      propertyId: true,
      createdAt: true,
      property: {
        select: {
          location: true,
          title: true,
        },
      },
    },
  })

  const distinctProperties = new Set(inquiries.map((inquiry) => inquiry.propertyId)).size
  const distinctLocations = new Set(
    inquiries.map((inquiry) => inquiry.property.location)
  ).size

  const locationMap = new Map<string, number>()

  for (const inquiry of inquiries) {
    const location = inquiry.property.location
    locationMap.set(location, (locationMap.get(location) ?? 0) + 1)
  }

  const chartData = Array.from(locationMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 4)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard
          label="My Inquiries"
          value={String(inquiries.length)}
          description="All property questions you have submitted through EstatePro."
          icon={MessageSquareMore}
        />
        <DashboardStatCard
          label="Properties Contacted"
          value={String(distinctProperties)}
          description="Distinct listings you have shown active interest in so far."
          icon={Building2}
        />
        <DashboardStatCard
          label="Locations Explored"
          value={String(distinctLocations)}
          description="Different neighborhoods or cities represented in your inquiries."
          icon={MapPin}
        />
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            Interest Chart
          </Badge>
          <CardTitle className="text-3xl">Property interests by location</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            See how your recent inquiries are distributed across the areas you are exploring.
          </p>
        </CardHeader>
        <CardContent>
          <UserInterestChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}
