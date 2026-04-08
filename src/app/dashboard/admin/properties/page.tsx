import Link from "next/link"
import { Building2, Search, Plus, MapPin, ExternalLink } from "lucide-react"

import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state"
import { PaginationControls } from "@/components/dashboard/pagination-controls"
import { requireManagerOrAdminSession } from "@/components/dashboard/dashboard-auth"
import { formatPrice } from "@/components/explore/explore-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 8

type AdminPropertiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? ""
}

export default async function AdminPropertiesPage({
  searchParams,
}: AdminPropertiesPageProps) {
  await requireManagerOrAdminSession("/dashboard/admin/properties")

  const params = await searchParams
  const query = getStringParam(params.query).trim()
  const requestedPage = Math.max(
    1,
    Number.parseInt(getStringParam(params.page) || "1", 10) || 1
  )

  const where = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { location: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {}

  const totalCount = await prisma.property.count({ where })
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const properties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      isAvailable: true,
      createdAt: true,
      _count: { select: { inquiries: true } },
    },
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="border-border/40 bg-background/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <CardHeader className="p-8 sm:p-10 border-b border-border/30 bg-secondary/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
                Property Inventory
              </Badge>
              <CardTitle className="text-3xl font-bold tracking-tight">Manage your portfolio</CardTitle>
              <p className="max-w-xl text-base text-muted-foreground font-medium leading-relaxed">
                Seamlessly track availability, track engagement, and refine your active listings across all markets.
              </p>
            </div>

            <Button asChild size="lg" className="rounded-xl font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
              <Link href="/dashboard/admin/properties/new">
                <Plus className="mr-2 size-5" />
                Add Property
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8 sm:p-10 space-y-8">
          {/* Search Bar Upgrade */}
          <form action="/dashboard/admin/properties" className="flex flex-col gap-4 sm:flex-row items-center">
            <div className="relative flex-1 group w-full">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                name="query"
                defaultValue={query}
                placeholder="Search by title, neighborhood or ZIP..."
                className="pl-11 h-12 rounded-xl bg-background/50 border-border/60 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button type="submit" variant="secondary" className="h-12 px-8 rounded-xl font-bold border-border/60 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary">
              Filter Results
            </Button>
          </form>

          {properties.length === 0 ? (
            <div className="py-20 border-2 border-dashed border-border/40 rounded-[2rem]">
              <DashboardEmptyState
                icon={Building2}
                title="No properties found"
                description="Adjust your search criteria or add a new luxury property to your system."
                actionHref="/dashboard/admin/properties/new"
                actionLabel="Create listing"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-background/40 overflow-hidden backdrop-blur-md">
                <Table>
                  <TableHeader className="bg-secondary/20">
                    <TableRow className="hover:bg-transparent border-border/40">
                      <TableHead className="py-5 font-bold text-foreground">Property Details</TableHead>
                      <TableHead className="font-bold text-foreground">Price</TableHead>
                      <TableHead className="font-bold text-foreground">Status</TableHead>
                      <TableHead className="text-center font-bold text-foreground">Leads</TableHead>
                      <TableHead className="font-bold text-foreground">Date Listed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id} className="group border-border/30 hover:bg-primary/5 transition-colors">
                        <TableCell className="py-5">
                          <div className="flex flex-col gap-1">
                            <Link
                              href={`/properties/${property.id}`}
                              className="font-bold text-base transition-colors hover:text-primary inline-flex items-center gap-2"
                            >
                              {property.title}
                              <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium leading-none">
                              <MapPin className="size-3 text-primary" />
                              {property.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-foreground">
                          {formatPrice(property.price)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={property.isAvailable ? "default" : "outline"}
                            className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              property.isAvailable ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-zinc-500/10 text-zinc-500"
                            )}
                          >
                            {property.isAvailable ? "Active" : "Archived"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-secondary/50 font-bold text-sm ring-1 ring-border/50">
                            {property._count.inquiries}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm font-medium">
                          {property.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between px-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing <span className="text-foreground font-bold">{properties.length}</span> luxury listings on this page.
                </p>
                <PaginationControls
                  pathname="/dashboard/admin/properties"
                  page={page}
                  query={query}
                  totalPages={totalPages}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}