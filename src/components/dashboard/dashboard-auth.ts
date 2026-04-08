import { redirect } from "next/navigation"

import { getAuthSession } from "@/app/api/auth/[...nextauth]/auth-options"
import { ROLES, type AppRole } from "@/lib/roles"

function getSignInHref(callbackUrl: string) {
  return `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
}

export function getDashboardHomeByRole(role: AppRole) {
  switch (role) {
    case ROLES.ADMIN:
      return "/dashboard/admin"
    case ROLES.MANAGER:
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

async function requireRoleSession(allowedRoles: readonly AppRole[], callbackUrl: string) {
  const session = await requireDashboardSession(callbackUrl)

  if (!allowedRoles.includes(session.user.role)) {
    redirect(getDashboardHomeByRole(session.user.role))
  }

  return session
}

export async function requireAdminSession(callbackUrl = "/dashboard/admin") {
  return requireRoleSession([ROLES.ADMIN], callbackUrl)
}

export async function requireManagerSession(callbackUrl = "/dashboard/manager") {
  return requireRoleSession([ROLES.MANAGER], callbackUrl)
}

export async function requireManagerOrAdminSession(callbackUrl = "/dashboard/admin") {
  return requireRoleSession([ROLES.ADMIN, ROLES.MANAGER], callbackUrl)
}

export async function requireUserSession(callbackUrl = "/dashboard/user") {
  return requireRoleSession([ROLES.USER], callbackUrl)
}
