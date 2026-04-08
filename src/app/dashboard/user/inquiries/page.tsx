import Link from "next/link"
import { MessageSquareMore, Search } from "lucide-react"

import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state"
import { PaginationControls } from "@/components/dashboard/pagination-controls"
import { requireUserSession } from "@/components/dashboard/dashboard-auth"
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

type UserInquiriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? ""
}

function truncateMessage(message: string) {
  return message.length > 90 ? `${message.slice(0, 87)}...` : message
}

export default async function UserInquiriesPage({
  searchParams,
}: UserInquiriesPageProps) {
  const session = await requireUserSession("/dashboard/user/inquiries")

  const params = await searchParams
  const query = getStringParam(params.query).trim()
  const requestedPage = Math.max(
    1,
    Number.parseInt(getStringParam(params.page) || "1", 10) || 1
  )

  const where = {
    userId: session.user.id,
    ...(query
      ? {
          OR: [
            { message: { contains: query, mode: "insensitive" as const } },
            { property: { title: { contains: query, mode: "insensitive" as const } } },
            { property: { location: { contains: query, mode: "insensitive" as const } } },
          ],
        }
      : {}),
  }

  const totalCount = await prisma.inquiry.count({ where })
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      message: true,
      createdAt: true,
      property: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  })

  return (
    <Card>
      <CardHeader className="space-y-4">
        <Badge variant="secondary" className="w-fit">
          My Inquiries
        </Badge>
        <CardTitle className="text-3xl">Review every message you have sent</CardTitle>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Search by property title, location, or your original message to find recent conversations faster.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <form action="/dashboard/user/inquiries" className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="query"
              defaultValue={query}
              placeholder="Search by property or message"
              className="pl-11"
            />
          </div>
          <Button type="submit" variant="outline" className="rounded-2xl">
            Search
          </Button>
        </form>

        {inquiries.length === 0 ? (
          <DashboardEmptyState
            icon={MessageSquareMore}
            title="No inquiries yet"
            description="Once you contact a property from the details page, the conversation history will show up here."
            actionHref="/explore"
            actionLabel="Browse properties"
          />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/properties/${inquiry.property.id}`}
                        className="transition-colors hover:text-primary"
                      >
                        {inquiry.property.title}
                      </Link>
                    </TableCell>
                    <TableCell>{inquiry.property.location}</TableCell>
                    <TableCell className="max-w-xs text-muted-foreground">
                      {truncateMessage(inquiry.message)}
                    </TableCell>
                    <TableCell>
                      {inquiry.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <PaginationControls
              pathname="/dashboard/user/inquiries"
              page={page}
              query={query}
              totalPages={totalPages}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
