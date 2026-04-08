import { requireManagerSession } from "@/components/dashboard/dashboard-auth"

export default async function ManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireManagerSession("/dashboard/manager")

  return children
}
