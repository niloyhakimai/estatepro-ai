import Link from "next/link"
import { Search, Users, UserCheck, ShieldAlert, Fingerprint, Mail, Calendar } from "lucide-react"

import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state"
import { PaginationControls } from "@/components/dashboard/pagination-controls"
import { requireAdminSession } from "@/components/dashboard/dashboard-auth"
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

type AdminUsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? ""
}

function getRoleBadgeStyles(role: "ADMIN" | "MANAGER" | "USER") {
  switch (role) {
    case "ADMIN":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
    case "MANAGER":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
    default:
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
  }
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  await requireAdminSession("/dashboard/admin/users")

  const params = await searchParams
  const query = getStringParam(params.query).trim()
  const requestedPage = Math.max(
    1,
    Number.parseInt(getStringParam(params.page) || "1", 10) || 1
  )

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {}

  const totalCount = await prisma.user.count({ where })
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: { inquiries: true, properties: true },
      },
    },
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)]">
        <CardHeader className="border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
              Member Directory
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Manage community access</CardTitle>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
              Review registered members, adjust administrative privileges, and monitor platform engagement across the network.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8 sm:p-10">
          {/* Advanced Search Area */}
          <form action="/dashboard/admin/users" className="flex flex-col gap-4 sm:flex-row items-center">
            <div className="group relative w-full flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-white/40" />
              <Input
                name="query"
                defaultValue={query}
                placeholder="Search by full name or email address..."
                className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 pl-11 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 rounded-[1.15rem] px-8 font-bold bg-slate-900 text-white shadow-md transition-all hover:bg-slate-800 dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
            >
              Search Accounts
            </Button>
          </form>

          {users.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-black/10 py-20 dark:border-white/10">
              <DashboardEmptyState
                icon={Users}
                title="No members found"
                description="When new clients or staff join the EstatePro network, their profile data will appear in this directory."
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-white/40 shadow-sm backdrop-blur-md transition-colors dark:border-white/10 dark:bg-black/20">
                <Table>
                  <TableHeader className="bg-black/[0.03] dark:bg-white/[0.03]">
                    <TableRow className="border-black/5 hover:bg-transparent dark:border-white/10">
                      <TableHead className="py-5 pl-6 font-bold text-slate-900 dark:text-white">Member Profile</TableHead>
                      <TableHead className="font-bold text-slate-900 dark:text-white">Account Role</TableHead>
                      <TableHead className="text-center font-bold text-slate-900 dark:text-white">Activity</TableHead>
                      <TableHead className="pr-6 text-right font-bold text-slate-900 dark:text-white">Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="group border-black/5 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.02]">
                        <TableCell className="py-6 pl-6">
                          <div className="flex items-center gap-4">
                            <div className="flex size-11 items-center justify-center rounded-2xl border border-black/5 bg-black/5 text-primary shadow-sm transition-colors group-hover:bg-white dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-black/40">
                              {user.name ? (
                                <span className="font-bold">{user.name.charAt(0).toUpperCase()}</span>
                              ) : (
                                <Fingerprint className="size-5" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold leading-tight text-slate-900 dark:text-white">
                                {user.name ?? "EstatePro Member"}
                              </span>
                              <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-white/60">
                                <Mail className="size-3 text-primary/60" />
                                {user.email ?? "Private Account"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={cn(
                              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-none",
                              getRoleBadgeStyles(user.role)
                            )}
                          >
                            {user.role === "ADMIN" && <ShieldAlert className="mr-1.5 size-3" />}
                            {user.role === "MANAGER" && <UserCheck className="mr-1.5 size-3" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                              <p className="text-sm font-black text-slate-900 dark:text-white">{user._count.inquiries}</p>
                              <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-white/50">Inquiries</p>
                            </div>
                            <div className="h-6 w-px bg-black/10 dark:bg-white/10" />
                            <div className="text-center">
                              <p className="text-sm font-black text-slate-900 dark:text-white">{user._count.properties}</p>
                              <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-white/50">Props</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                              <Calendar className="size-3 text-primary" />
                              {user.createdAt.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between px-2">
                <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                  Overseeing <span className="font-bold text-slate-900 dark:text-white">{users.length}</span> active member profiles.
                </p>
                <PaginationControls
                  pathname="/dashboard/admin/users"
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