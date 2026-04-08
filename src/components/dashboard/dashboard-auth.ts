import { Role } from "@prisma/client"
import { redirect } from "next/navigation"

import { getAuthSession } from "@/app/api/auth/[...nextauth]/auth-options"

function getSignInHref(callbackUrl: string) {
  return `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
}

export function getDashboardHomeByRole(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return "/dashboard/admin"
    case Role.MANAGER:
      return "/dashboard/manager"
    default:
      return "/dashboard/user"
  }
}

export async function requireDashboardSession(callbackUrl = "/dashboard") {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(getSignInHref(callbackUrl))
  }

  return session
}

async function requireRoleSession(allowedRoles: Role[], callbackUrl: string) {
  const session = await requireDashboardSession(callbackUrl)

  if (!allowedRoles.includes(session.user.role)) {
    redirect(getDashboardHomeByRole(session.user.role))
  }

  return session
}

export async function requireAdminSession(callbackUrl = "/dashboard/admin") {
  return requireRoleSession([Role.ADMIN], callbackUrl)
}

export async function requireManagerSession(callbackUrl = "/dashboard/manager") {
  return requireRoleSession([Role.MANAGER], callbackUrl)
}

export async function requireManagerOrAdminSession(callbackUrl = "/dashboard/admin") {
  return requireRoleSession([Role.ADMIN, Role.MANAGER], callbackUrl)
}

export async function requireUserSession(callbackUrl = "/dashboard/user") {
  return requireRoleSession([Role.USER], callbackUrl)
}
