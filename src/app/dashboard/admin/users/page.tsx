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
      return "bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-none"
    case "MANAGER":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-none"
    default:
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none"
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
      <Card className="border-border/40 bg-background/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <CardHeader className="p-8 sm:p-10 border-b border-border/30 bg-secondary/5">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
              Member Directory
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight">Manage community access</CardTitle>
            <p className="max-w-2xl text-base text-muted-foreground font-medium leading-relaxed">
              Review registered members, adjust administrative privileges, and monitor platform engagement across the network.
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 sm:p-10 space-y-8">
          {/* Advanced Search Area */}
          <form action="/dashboard/admin/users" className="flex flex-col gap-4 sm:flex-row items-center">
            <div className="relative flex-1 group w-full">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                name="query"
                defaultValue={query}
                placeholder="Search by full name or email address..."
                className="pl-11 h-12 rounded-xl bg-background/50 border-border/60 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button type="submit" variant="secondary" className="h-12 px-8 rounded-xl font-bold border-border/60 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary">
              Search Accounts
            </Button>
          </form>

          {users.length === 0 ? (
            <div className="py-20 border-2 border-dashed border-border/40 rounded-[2rem]">
              <DashboardEmptyState
                icon={Users}
                title="No members found"
                description="When new clients or staff join the EstatePro network, their profile data will appear in this directory."
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-background/40 overflow-hidden backdrop-blur-md shadow-sm">
                <Table>
                  <TableHeader className="bg-secondary/20">
                    <TableRow className="hover:bg-transparent border-border/40">
                      <TableHead className="py-5 pl-6 font-bold text-foreground">Member Profile</TableHead>
                      <TableHead className="font-bold text-foreground">Account Role</TableHead>
                      <TableHead className="text-center font-bold text-foreground">Activity</TableHead>
                      <TableHead className="font-bold text-foreground text-right pr-6">Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="group border-border/30 hover:bg-primary/5 transition-colors">
                        <TableCell className="py-6 pl-6">
                          <div className="flex items-center gap-4">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary/50 border border-border/60 font-bold text-primary shadow-sm group-hover:bg-background transition-colors">
                              {user.name ? user.name.charAt(0).toUpperCase() : <Fingerprint className="size-5" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground leading-tight">
                                {user.name ?? "EstatePro Member"}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1">
                                <Mail className="size-3 text-primary/60" />
                                {user.email ?? "Private Account"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                            getRoleBadgeStyles(user.role)
                          )}>
                            {user.role === "ADMIN" && <ShieldAlert className="mr-1.5 size-3" />}
                            {user.role === "MANAGER" && <UserCheck className="mr-1.5 size-3" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                              <p className="text-sm font-black text-foreground">{user._count.inquiries}</p>
                              <p className="text-[10px] uppercase font-bold text-muted-foreground">Inquiries</p>
                            </div>
                            <div className="w-px h-6 bg-border/40" />
                            <div className="text-center">
                              <p className="text-sm font-black text-foreground">{user._count.properties}</p>
                              <p className="text-[10px] uppercase font-bold text-muted-foreground">Props</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
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
                <p className="text-sm font-medium text-muted-foreground">
                  Overseeing <span className="text-foreground font-bold">{users.length}</span> active member profiles.
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