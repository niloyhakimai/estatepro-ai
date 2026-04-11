"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
} from "lucide-react"
import { signOut } from "next-auth/react"

import { getNavItems, type DashboardRole } from "@/components/dashboard/dashboard-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type DashboardShellProps = {
  children: React.ReactNode
  role: DashboardRole
  user: {
    email?: string | null
    image?: string | null
    name?: string | null
  }
}

function getInitials(name?: string | null, email?: string | null) {
  const value = name?.trim() || email?.trim() || "EP"
  const parts = value.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function getPageTitle(pathname: string, role: DashboardRole) {
  const match = getNavItems(role).find((item) => isActivePath(pathname, item.href))
  return match?.label ?? "Overview"
}

function DashboardUserMenu({
  user,
}: {
  user: DashboardShellProps["user"]
}) {
  const name = user.name ?? "EstatePro Member"
  const email = user.email ?? "Private account"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-11 rounded-full border-white/10 bg-white/[0.05] px-2.5 text-white shadow-[0_18px_40px_-28px_rgba(2,10,20,0.82)] backdrop-blur-xl transition-colors hover:bg-white/[0.1]"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? undefined} alt={name} />
            <AvatarFallback className="bg-primary/15 text-[0.65rem] font-bold text-primary ring-1 ring-white/10">
              {getInitials(name, email)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-left md:block">
            <span className="block max-w-28 truncate pl-2 text-xs font-bold text-white">
              {name}
            </span>
          </span>
          <ChevronDown className="ml-1 size-3 shrink-0 text-white/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-72 rounded-[1.7rem] border-white/10 bg-[#0d1620]/95 p-2 text-white shadow-[0_30px_90px_-50px_rgba(2,10,20,0.96)]"
      >
        <DropdownMenuLabel className="px-0 py-0 normal-case tracking-normal">
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="mt-1 truncate text-xs text-white/58">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-white/10" />
        <DropdownMenuItem
          asChild
          className="rounded-[1rem] px-3 py-3 text-white/82 focus:bg-white/[0.08] focus:text-white"
        >
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <LayoutDashboard className="size-4 shrink-0" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="rounded-[1rem] px-3 py-3 text-white/82 focus:bg-white/[0.08] focus:text-white"
        >
          <Link href="/dashboard/profile" className="flex items-center gap-2.5">
            <UserRound className="size-4 shrink-0" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-white/10" />
        <DropdownMenuItem
          variant="destructive"
          className="rounded-[1rem] px-3 py-3 font-medium text-red-300 focus:bg-red-500/10 focus:text-red-200"
          onSelect={(event) => {
            event.preventDefault()
            void signOut({ callbackUrl: "/" })
          }}
        >
          <LogOut className="size-4 shrink-0" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DashboardShell({ children, role, user }: DashboardShellProps) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const pageTitle = getPageTitle(pathname, role)

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1580px] gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        
        <aside className="hidden lg:block">
          <div className="sticky top-5 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b131c]/82 shadow-[0_28px_90px_-54px_rgba(2,10,20,0.88)] backdrop-blur-xl transition-colors duration-500">
            <DashboardSidebar pathname={pathname} role={role} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <header className="sticky top-5 z-40 flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-[#0b131c]/78 px-4 py-4 shadow-[0_24px_80px_-48px_rgba(2,10,20,0.88)] backdrop-blur-xl transition-colors duration-500 sm:px-6">
            <div className="flex min-w-0 items-center gap-4">
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-white/[0.1]"
                    >
                      <Menu className="size-4 shrink-0" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[85vw] max-w-sm border-r border-white/10 bg-[#0b131c]/96 p-0 text-white shadow-[0_30px_90px_-50px_rgba(2,10,20,0.96)] backdrop-blur-2xl"
                  >
                    <DashboardSidebar
                      pathname={pathname}
                      role={role}
                      close={() => setOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.05] text-primary transition-colors">
                <LayoutDashboard className="size-5 shrink-0" />
              </span>

              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/50">
                  EstatePro Portal
                </p>
                <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 shadow-[0_18px_40px_-28px_rgba(2,10,20,0.7)] backdrop-blur-xl md:flex">
                <div className="text-right">
                  <p className="text-xs font-bold text-white">
                    {user.name ?? "Member"}
                  </p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/48">
                    Verified account
                  </p>
                </div>
                <div className="relative">
                  <Avatar className="size-9 ring-2 ring-[#0b131c]">
                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
                    <AvatarFallback className="bg-primary/15 text-[0.65rem] font-bold text-primary ring-1 ring-white/10">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#0b131c] bg-emerald-400" />
                </div>
              </div>

              <ThemeToggle className="border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1] dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.1]" />

              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-white/[0.1]"
              >
                <Bell className="size-4 shrink-0" />
                <span className="absolute right-2 top-2 size-2 rounded-full border border-[#0b131c] bg-primary" />
              </Button>

              <DashboardUserMenu user={user} />
            </div>
          </header>

          <main className="min-h-[calc(100vh-10rem)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-[2.5rem] border border-black/5 bg-black/[0.02] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-colors dark:border-white/5 dark:bg-white/[0.02] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              {children}
            </div>
          </main>

          <footer className="pb-8 pt-2">
            <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
              Secure infrastructure | EstatePro real estate systems
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
