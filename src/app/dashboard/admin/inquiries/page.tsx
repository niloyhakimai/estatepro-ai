import Link from "next/link"
import { ClipboardList, Search, MessageCircle, MapPin, User, Calendar } from "lucide-react"

import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state"
import { PaginationControls } from "@/components/dashboard/pagination-controls"
import { requireManagerOrAdminSession } from "@/components/dashboard/dashboard-auth"
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

const PAGE_SIZE = 8

type AdminInquiriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? ""
}

function truncateMessage(message: string) {
  return message.length > 80 ? `${message.slice(0, 77)}...` : message
}

export default async function AdminInquiriesPage({
  searchParams,
}: AdminInquiriesPageProps) {
  await requireManagerOrAdminSession("/dashboard/admin/inquiries")

  const params = await searchParams
  const query = getStringParam(params.query).trim()
  const requestedPage = Math.max(
    1,
    Number.parseInt(getStringParam(params.page) || "1", 10) || 1
  )

  const where = query
    ? {
        OR: [
          { message: { contains: query, mode: "insensitive" as const } },
          { property: { title: { contains: query, mode: "insensitive" as const } } },
          { user: { name: { contains: query, mode: "insensitive" as const } } },
          { user: { email: { contains: query, mode: "insensitive" as const } } },
        ],
      }
    : {}

  const totalCount = await prisma.inquiry.count({ where })
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      message: true,
      createdAt: true,
      property: {
        select: { id: true, title: true, location: true },
      },
      user: {
        select: { email: true, name: true },
      },
    },
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="border-border/40 bg-background/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <CardHeader className="p-8 sm:p-10 border-b border-border/30 bg-secondary/5">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
              Communication Log
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight">Monitor buyer conversations</CardTitle>
            <p className="max-w-2xl text-base text-muted-foreground font-medium leading-relaxed">
              Track interest and respond to inquiries across your entire property portfolio in real-time.
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 sm:p-10 space-y-8">
          {/* Enhanced Search Header */}
          <form action="/dashboard/admin/inquiries" className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1 group w-full">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                name="query"
                defaultValue={query}
                placeholder="Search by buyer, property or keyword..."
                className="pl-11 h-12 rounded-xl bg-background/50 border-border/60 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button type="submit" variant="secondary" className="h-12 px-8 rounded-xl font-bold border-border/60 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary">
              Search Log
            </Button>
          </form>

          {inquiries.length === 0 ? (
            <div className="py-20 border-2 border-dashed border-border/40 rounded-[2rem]">
              <DashboardEmptyState
                icon={ClipboardList}
                title="No inquiries match your search"
                description="When buyers reach out about your luxury properties, their messages will appear here."
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-background/40 overflow-hidden backdrop-blur-md shadow-sm">
                <Table>
                  <TableHeader className="bg-secondary/20">
                    <TableRow className="hover:bg-transparent border-border/40">
                      <TableHead className="py-5 pl-6 font-bold text-foreground">Buyer Details</TableHead>
                      <TableHead className="font-bold text-foreground">Property Interest</TableHead>
                      <TableHead className="font-bold text-foreground w-[40%]">Message Preview</TableHead>
                      <TableHead className="font-bold text-foreground text-right pr-6">Date Received</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id} className="group border-border/30 hover:bg-primary/5 transition-colors">
                        <TableCell className="py-6 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                              <User className="size-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground leading-tight">
                                {inquiry.user.name ?? "EstatePro Member"}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {inquiry.user.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Link
                              href={`/properties/${inquiry.property.id}`}
                              className="font-bold text-sm transition-colors hover:text-primary leading-tight"
                            >
                              {inquiry.property.title}
                            </Link>
                            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                              <MapPin className="size-3 text-primary" />
                              {inquiry.property.location.split(',')[0]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <MessageCircle className="size-4 text-primary shrink-0 mt-0.5 opacity-60" />
                            <p className="text-sm leading-relaxed text-muted-foreground italic font-medium">
                              "{truncateMessage(inquiry.message)}"
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                              <Calendar className="size-3 text-primary" />
                              {inquiry.createdAt.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">
                              {inquiry.createdAt.getFullYear()}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between px-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Logged <span className="text-foreground font-bold">{inquiries.length}</span> active conversations.
                </p>
                <PaginationControls
                  pathname="/dashboard/admin/inquiries"
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