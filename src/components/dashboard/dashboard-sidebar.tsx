"use client"

import Link from "next/link"
import { LayoutDashboard, LogOut, ShieldCheck, UserCircle, UserCog } from "lucide-react"
import { signOut } from "next-auth/react"

import { getNavItems, type DashboardRole } from "@/components/dashboard/dashboard-nav"
import { SiteLogo } from "@/components/layout/site-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DashboardSidebarProps = {
  close?: () => void
  pathname: string
  role: DashboardRole
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function getRoleConfig(role: DashboardRole) {
  switch (role) {
    case "ADMIN":
      return {
        className: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        icon: ShieldCheck,
        label: "Administrator",
      }
    case "MANAGER":
      return {
        className: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400",
        icon: UserCog,
        label: "Manager",
      }
    default:
      return {
        className: "border-primary/20 bg-primary/10 text-primary dark:bg-primary/20",
        icon: UserCircle,
        label: "Client",
      }
  }
}

export function DashboardSidebar({
  close,
  pathname,
  role,
}: DashboardSidebarProps) {
  const navItems = getNavItems(role)
  const roleConfig = getRoleConfig(role)
  const RoleIcon = roleConfig.icon

  return (
    <div className="flex h-full flex-col bg-transparent">
      {/* Top Section with Logo */}
      <div className="border-b border-black/5 px-6 py-7 transition-colors dark:border-white/10">
        <SiteLogo className="[&>span:first-child]:border-white/18 [&>span:first-child]:bg-white/10 [&>span:first-child]:shadow-none" />

        <div
          className={cn(
            "mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] shadow-sm",
            roleConfig.className
          )}
        >
          <RoleIcon className="size-4 shrink-0" />
          <span>{roleConfig.label}</span>
        </div>
      </div>

      {/* Control Center Box */}
      <div className="border-b border-black/5 px-6 py-5 transition-colors dark:border-white/10">
        <div className="flex items-center gap-3 rounded-[1.25rem] border border-black/5 bg-black/[0.02] px-4 py-3 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.04]">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
            <LayoutDashboard className="size-4 shrink-0" />
          </span>
          <div className="space-y-1">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">
              Control center
            </p>
            <p className="text-[0.8rem] font-bold leading-tight text-slate-900 dark:text-white">
              Manage listings, inquiries, and account actions.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-white/40">
          Navigation
        </p>

        <div className="space-y-2 pt-3">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = isActivePath(pathname, href)

            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={cn(
                  "group flex items-center gap-3 rounded-[1.15rem] border px-3.5 py-3 text-sm font-semibold transition-all duration-300",
                  active
                    ? "border-black/5 bg-white text-slate-900 shadow-md dark:border-primary/20 dark:bg-primary/10 dark:text-white dark:shadow-[0_18px_40px_-28px_rgba(41,194,179,0.6)]"
                    : "border-transparent text-slate-600 hover:bg-black/5 hover:text-slate-900 dark:text-white/70 dark:hover:border-white/10 dark:hover:bg-white/[0.04] dark:hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors",
                    active
                      ? "border-black/5 bg-primary/10 text-primary dark:border-primary/20 dark:bg-primary/20"
                      : "border-black/5 bg-white text-slate-400 shadow-sm group-hover:border-black/10 group-hover:text-primary dark:border-white/10 dark:bg-black/40 dark:text-white/40 dark:group-hover:border-white/20 dark:group-hover:text-primary"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                </span>
                <span className="truncate">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="mt-auto border-t border-black/5 px-4 py-5 transition-colors dark:border-white/10">
        <Button
          variant="outline"
          className="h-11 w-full rounded-[1.15rem] border-white/10 bg-white/[0.05] font-bold text-white/82 shadow-none transition-colors hover:bg-red-500/10 hover:text-red-300 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/82 dark:hover:bg-red-500/10 dark:hover:text-red-300"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 size-4 shrink-0" />
          Sign Out
        </Button>

        <p className="mt-4 text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-white/40">
          EstatePro premium access
        </p>
      </div>
    </div>
  )
}
