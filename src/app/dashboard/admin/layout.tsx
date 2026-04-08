import { requireManagerOrAdminSession } from "@/components/dashboard/dashboard-auth"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireManagerOrAdminSession("/dashboard/admin")

  return children
}
