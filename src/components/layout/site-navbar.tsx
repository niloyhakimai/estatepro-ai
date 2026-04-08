"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  ChevronDown,
  ContactRound,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  UserRound,
} from "lucide-react"

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import { SiteLogo } from "./site-logo"
import { ThemeToggle } from "./theme-toggle"

const primaryLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/about", label: "About", icon: ContactRound },
  { href: "/contact", label: "Contact", icon: ContactRound },
]

const dashboardLink = {
  href: "/dashboard",
  label: "Dashboard",
  icon: LayoutDashboard,
}

function getUserInitials(name?: string | null, email?: string | null) {
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
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function AuthButtons({
  stacked = false,
  onAction,
}: {
  stacked?: boolean
  onAction?: () => void
}) {
  return (
    <div className={cn("flex items-center gap-2", stacked && "flex-col items-stretch")}>
      <Button
        variant="outline"
        className="rounded-full border-border/70 bg-background/75"
        onClick={() => {
          onAction?.()
          void signIn(undefined, { callbackUrl: "/dashboard" })
        }}
      >
        Sign In
      </Button>
      <Button asChild className="rounded-full">
        <Link
          href="/register"
          onClick={() => {
            onAction?.()
          }}
        >
          Sign Up
        </Link>
      </Button>
    </div>
  )
}

function UserMenu() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const name = session.user.name ?? "EstatePro Member"
  const email = session.user.email ?? "Private account"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-11 rounded-full border-border/70 bg-background/80 px-2 shadow-sm backdrop-blur-sm"
        >
          <Avatar size="sm">
            <AvatarImage src={session.user.image ?? undefined} alt={name} />
            <AvatarFallback>{getUserInitials(name, email)}</AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="normal-case tracking-normal">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <UserRound className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={(event) => {
            event.preventDefault()
            void signOut({ callbackUrl: "/" })
          }}
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SiteNavbar() {
  const pathname = usePathname()
  const { status } = useSession()
  const [open, setOpen] = React.useState(false)
  const isAuthenticated = status === "authenticated"
  const visibleLinks = isAuthenticated ? [...primaryLinks, dashboardLink] : primaryLinks

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/58">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center">
          <SiteLogo />
        </div>

        <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
          <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card/75 p-1.5 shadow-sm backdrop-blur-sm">
            {visibleLinks.map(({ href, label }) => {
              const active = isActivePath(pathname, href)

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />

          <div className="hidden items-center gap-2 lg:flex">
            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </div>

          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border/70 bg-background/80 shadow-sm"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88vw] max-w-sm border-border/70 bg-background/96 px-0"
              >
                <SheetHeader className="border-b border-border/70">
                  <SiteLogo />
                  <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
                  <SheetDescription>
                    Browse listings, open your dashboard, and manage your account from
                    one responsive control panel.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-6 px-6 py-6">
                  <div className="space-y-2">
                    {visibleLinks.map(({ href, label, icon: Icon }) => {
                      const active = isActivePath(pathname, href)

                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                            active
                              ? "border-primary/20 bg-primary/10 text-foreground"
                              : "border-border/70 bg-card/70 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                          )}
                        >
                          <Icon className="size-4" />
                          {label}
                        </Link>
                      )
                    })}
                  </div>

                  <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Account
                    </p>
                    <div className="mt-4">
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <Link
                            href="/dashboard/profile"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70"
                          >
                            <UserRound className="size-4" />
                            Profile
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full rounded-2xl"
                            onClick={() => {
                              setOpen(false)
                              void signOut({ callbackUrl: "/" })
                            }}
                          >
                            <LogOut className="size-4" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <AuthButtons stacked onAction={() => setOpen(false)} />
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
