"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, UserRound, Layout, Bell } from "lucide-react"
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
import { cn } from "@/lib/utils"

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
          className="h-11 w-11 rounded-full border-border/40 bg-background/40 p-0 shadow-sm backdrop-blur-md transition-all hover:bg-background/60 active:scale-95 ring-1 ring-primary/10"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image ?? undefined} alt={name} />
            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">{getInitials(name, email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl">
        <DropdownMenuLabel className="p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-foreground leading-none">{name}</p>
            <p className="text-xs text-muted-foreground font-medium truncate">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem asChild className="cursor-pointer rounded-xl m-1 transition-colors hover:bg-primary/10 hover:text-primary">
          <Link href="/dashboard/profile" className="flex items-center">
            <UserRound className="mr-2 size-4" />
            Profile Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer rounded-xl m-1"
          onSelect={(event) => {
            event.preventDefault()
            void signOut({ callbackUrl: "/" })
          }}
        >
          <LogOut className="mr-2 size-4" />
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--primary-muted),transparent)] dark:bg-transparent">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[18rem_1fr] lg:gap-8 lg:px-8">
        
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-3rem)] overflow-hidden rounded-[2.5rem] border border-border/40 bg-background/60 shadow-2xl backdrop-blur-xl">
            <DashboardSidebar pathname={pathname} role={role} />
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-col space-y-8">
          
          {/* --- DASHBOARD HEADER --- */}
          <header className="sticky top-6 z-30 flex items-center justify-between gap-4 rounded-[2rem] border border-border/30 bg-background/60 px-5 py-4 shadow-xl backdrop-blur-xl transition-all duration-300 sm:px-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Trigger */}
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-border/60 bg-background/40 shadow-sm backdrop-blur-md active:scale-95"
                    >
                      <Menu className="size-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[85vw] max-w-sm border-r border-border/40 bg-background/95 px-0 backdrop-blur-xl"
                  >
                    <DashboardSidebar
                      pathname={pathname}
                      role={role}
                      close={() => setOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex rounded-md bg-primary/10 p-1">
                    <Layout className="size-3.5 text-primary" />
                  </span>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-muted-foreground/80">
                    EstatePro Portal
                  </p>
                </div>
                <h1 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Profile Status */}
              <div className="hidden items-center gap-3 rounded-2xl border border-border/40 bg-secondary/30 px-4 py-2 backdrop-blur-md sm:flex">
                <div className="flex flex-col items-end text-right">
                  <p className="text-[0.7rem] font-bold text-foreground leading-none">
                    {user.name ?? "Member"}
                  </p>
                  <p className="text-[0.6rem] font-medium text-muted-foreground">Verified Account</p>
                </div>
                <div className="relative">
                  <Avatar size="sm" className="h-8 w-8 ring-2 ring-background">
                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
                    <AvatarFallback className="bg-primary/20 text-[10px] font-black text-primary">{getInitials(user.name, user.email)}</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500 shadow-sm" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary relative">
                  <Bell className="size-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <DashboardUserMenu user={user} />
              </div>
            </div>
          </header>

          {/* --- MAIN PAGE CONTENT --- */}
          <main className="min-h-[calc(100vh-12rem)] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="rounded-[2.5rem] bg-transparent">
              {children}
            </div>
          </main>

          {/* --- OPTIONAL DASHBOARD FOOTER --- */}
          <footer className="pt-4 pb-8 border-t border-border/20">
             <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
                Secure Infrastructure • EstatePro Real Estate Systems
             </p>
          </footer>
        </div>
      </div>
    </div>
  )
}