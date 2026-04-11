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
      <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)]">
        <CardHeader className="border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
              Communication Log
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Monitor buyer conversations</CardTitle>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
              Track interest and respond to inquiries across your entire property portfolio in real-time.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8 sm:p-10">
          {/* Enhanced Search Header */}
          <form action="/dashboard/admin/inquiries" className="flex flex-col gap-4 sm:flex-row">
            <div className="group relative w-full flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-white/40" />
              <Input
                name="query"
                defaultValue={query}
                placeholder="Search by buyer, property or keyword..."
                className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 pl-11 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 rounded-[1.15rem] px-8 font-bold bg-slate-900 text-white shadow-md transition-all hover:bg-slate-800 dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
            >
              Search Log
            </Button>
          </form>

          {inquiries.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-black/10 py-20 dark:border-white/10">
              <DashboardEmptyState
                icon={ClipboardList}
                title="No inquiries match your search"
                description="When buyers reach out about your luxury properties, their messages will appear here."
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-white/40 shadow-sm backdrop-blur-md transition-colors dark:border-white/10 dark:bg-black/20">
                <Table>
                  <TableHeader className="bg-black/[0.03] dark:bg-white/[0.03]">
                    <TableRow className="border-black/5 hover:bg-transparent dark:border-white/10">
                      <TableHead className="py-5 pl-6 font-bold text-slate-900 dark:text-white">Buyer Details</TableHead>
                      <TableHead className="font-bold text-slate-900 dark:text-white">Property Interest</TableHead>
                      <TableHead className="w-[40%] font-bold text-slate-900 dark:text-white">Message Preview</TableHead>
                      <TableHead className="pr-6 text-right font-bold text-slate-900 dark:text-white">Date Received</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id} className="group border-black/5 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.02]">
                        <TableCell className="py-6 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary dark:bg-primary/20">
                              <User className="size-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold leading-tight text-slate-900 dark:text-white">
                                {inquiry.user.name ?? "EstatePro Member"}
                              </span>
                              <span className="text-xs font-medium text-slate-500 dark:text-white/60">
                                {inquiry.user.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Link
                              href={`/properties/${inquiry.property.id}`}
                              className="text-sm font-bold leading-tight text-slate-900 transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
                            >
                              {inquiry.property.title}
                            </Link>
                            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/50">
                              <MapPin className="size-3 text-primary" />
                              {inquiry.property.location.split(',')[0]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary opacity-60" />
                            <p className="text-sm font-medium italic leading-relaxed text-slate-600 dark:text-white/70">
                              &ldquo;{truncateMessage(inquiry.message)}&rdquo;
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                              <Calendar className="size-3 text-primary" />
                              {inquiry.createdAt.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 dark:text-white/50">
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
                <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                  Logged <span className="font-bold text-slate-900 dark:text-white">{inquiries.length}</span> active conversations.
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