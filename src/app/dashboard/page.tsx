import { redirect } from "next/navigation"

import {
  getDashboardHomeByRole,
  requireDashboardSession,
} from "@/components/dashboard/dashboard-auth"

export default async function DashboardRootPage() {
  const session = await requireDashboardSession("/dashboard")

  redirect(getDashboardHomeByRole(session.user.role))
}
