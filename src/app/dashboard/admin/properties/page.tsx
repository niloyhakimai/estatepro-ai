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
      <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)]">
        <CardHeader className="border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
                Property Inventory
              </Badge>
              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Manage your portfolio</CardTitle>
              <p className="max-w-xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
                Seamlessly track availability, track engagement, and refine your active listings across all markets.
              </p>
            </div>

            <Button 
              asChild 
              size="lg" 
              className="h-12 rounded-[1.15rem] bg-slate-900 px-6 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
            >
              <Link href="/dashboard/admin/properties/new">
                <Plus className="mr-2 size-5" />
                Add Property
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8 sm:p-10">
          {/* Search Bar Upgrade */}
          <form action="/dashboard/admin/properties" className="flex flex-col gap-4 sm:flex-row items-center">
            <div className="group relative w-full flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-white/40" />
              <Input
                name="query"
                defaultValue={query}
                placeholder="Search by title, neighborhood or ZIP..."
                className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 pl-11 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 rounded-[1.15rem] px-8 font-bold bg-slate-900 text-white shadow-md transition-all hover:bg-slate-800 dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
            >
              Filter Results
            </Button>
          </form>

          {properties.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-black/10 py-20 dark:border-white/10">
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
              <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-white/40 shadow-sm backdrop-blur-md transition-colors dark:border-white/10 dark:bg-black/20">
                <Table>
                  <TableHeader className="bg-black/[0.03] dark:bg-white/[0.03]">
                    <TableRow className="border-black/5 hover:bg-transparent dark:border-white/10">
                      <TableHead className="py-5 font-bold text-slate-900 dark:text-white pl-6">Property Details</TableHead>
                      <TableHead className="font-bold text-slate-900 dark:text-white">Price</TableHead>
                      <TableHead className="font-bold text-slate-900 dark:text-white">Status</TableHead>
                      <TableHead className="text-center font-bold text-slate-900 dark:text-white">Leads</TableHead>
                      <TableHead className="font-bold text-slate-900 dark:text-white">Date Listed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id} className="group border-black/5 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.02]">
                        <TableCell className="py-5 pl-6">
                          <div className="flex flex-col gap-1">
                            <Link
                              href={`/properties/${property.id}`}
                              className="font-bold text-base text-slate-900 transition-colors hover:text-primary inline-flex items-center gap-2 dark:text-white dark:hover:text-primary"
                            >
                              {property.title}
                              <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest font-black leading-none dark:text-white/50">
                              <MapPin className="size-3 text-primary" />
                              {property.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-slate-900 dark:text-white">
                          {formatPrice(property.price)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={property.isAvailable ? "default" : "outline"}
                            className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                              property.isAvailable 
                                ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400" 
                                : "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400"
                            )}
                          >
                            {property.isAvailable ? "Active" : "Archived"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-black/5 font-bold text-sm ring-1 ring-black/10 text-slate-900 dark:bg-white/10 dark:ring-white/20 dark:text-white">
                            {property._count.inquiries}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm font-medium dark:text-white/70">
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
                <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                  Showing <span className="font-bold text-slate-900 dark:text-white">{properties.length}</span> luxury listings on this page.
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