"use client"

import Link from "next/link"
import { LogOut, LayoutDashboard, UserCircle, ShieldCheck, UserCog } from "lucide-react"
import { signOut } from "next-auth/react"

import { getNavItems, type DashboardRole } from "@/components/dashboard/dashboard-nav"
import { SiteLogo } from "@/components/layout/site-logo"
import { Badge } from "@/components/ui/badge"
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
        label: "Administrator",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        icon: ShieldCheck
      }
    case "MANAGER":
      return {
        label: "Manager",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        icon: UserCog
      }
    default:
      return {
        label: "Client",
        className: "bg-primary/10 text-primary border-primary/20",
        icon: UserCircle
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
    <div className="flex h-full flex-col bg-background/50 backdrop-blur-xl border-r border-border/40">
      {/* --- SIDEBAR HEADER --- */}
      <div className="flex flex-col gap-4 border-b border-border/40 px-6 py-8">
        <div className="flex items-center justify-between">
          <SiteLogo />
        </div>
        
        <div className={cn(
          "flex items-center gap-2.5 rounded-xl border px-3 py-2 shadow-sm backdrop-blur-md",
          roleConfig.className
        )}>
          <RoleIcon className="size-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {roleConfig.label}
          </span >
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 space-y-1.5 px-4 py-8 overflow-y-auto custom-scrollbar">
        <p className="px-3 mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
          Management Menu
        </p>
        
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = isActivePath(pathname, href)

          return (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-1"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:translate-x-1"
              )}
            >
              <Icon className={cn(
                "size-4.5 transition-transform duration-300 group-hover:scale-110",
                active ? "text-primary-foreground" : "text-primary"
              )} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* --- SIDEBAR FOOTER --- */}
      <div className="mt-auto border-t border-border/40 p-4 bg-secondary/10">
        <Button
          variant="outline"
          className="group w-full h-12 rounded-xl border-border/60 bg-background/60 font-bold shadow-sm transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 active:scale-95"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
          Sign Out
        </Button>
        
        <p className="mt-4 text-[0.65rem] text-center text-muted-foreground/60 font-medium">
          EstatePro v2.5 Premium Access
        </p>
      </div>
    </div>
  )
}