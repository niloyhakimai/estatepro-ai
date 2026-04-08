import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Building2,
  CircleUserRound,
  ClipboardList,
  LayoutDashboard,
  MessageSquareMore,
  Users,
} from "lucide-react"

export type DashboardRole = "ADMIN" | "MANAGER" | "USER"

export type DashboardNavItem = {
  href: string
  icon: LucideIcon
  label: string
}

export const userNavItems: DashboardNavItem[] = [
  {
    href: "/dashboard/user",
    icon: LayoutDashboard,
    label: "Overview",
  },
  {
    href: "/dashboard/user/inquiries",
    icon: MessageSquareMore,
    label: "My Inquiries",
  },
  {
    href: "/dashboard/profile",
    icon: CircleUserRound,
    label: "Profile Settings",
  },
]

export const managerNavItems: DashboardNavItem[] = [
  {
    href: "/dashboard/manager",
    icon: BarChart3,
    label: "Overview",
  },
  {
    href: "/dashboard/admin/properties",
    icon: Building2,
    label: "Manage Properties",
  },
  {
    href: "/dashboard/admin/inquiries",
    icon: ClipboardList,
    label: "Manage Inquiries",
  },
  {
    href: "/dashboard/profile",
    icon: CircleUserRound,
    label: "Profile Settings",
  },
]

export const adminNavItems: DashboardNavItem[] = [
  {
    href: "/dashboard/admin",
    icon: BarChart3,
    label: "Overview",
  },
  {
    href: "/dashboard/admin/properties",
    icon: Building2,
    label: "Manage Properties",
  },
  {
    href: "/dashboard/admin/inquiries",
    icon: ClipboardList,
    label: "Manage Inquiries",
  },
  {
    href: "/dashboard/admin/users",
    icon: Users,
    label: "Manage Users",
  },
  {
    href: "/dashboard/profile",
    icon: CircleUserRound,
    label: "Profile Settings",
  },
]

export function getNavItems(role: DashboardRole) {
  switch (role) {
    case "ADMIN":
      return adminNavItems
    case "MANAGER":
      return managerNavItems
    default:
      return userNavItems
  }
}
