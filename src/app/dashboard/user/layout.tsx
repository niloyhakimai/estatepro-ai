import { requireUserSession } from "@/components/dashboard/dashboard-auth"

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUserSession("/dashboard/user")

  return children
}
