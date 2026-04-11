"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
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
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/explore", label: "Property List" },
  { href: "/contact", label: "Contact Us" },
]

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
  isFloating = false,
}: {
  stacked?: boolean
  onAction?: () => void
  isFloating?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center",
        stacked ? "flex-col items-stretch gap-3" : "gap-3"
      )}
    >
      <Button
        variant="outline"
        className={cn(
          "h-10 rounded-full px-5 font-semibold shadow-none transition-colors",
          isFloating && !stacked
            ? "border-white/18 bg-white/8 text-white backdrop-blur-md hover:bg-white/14 hover:text-white"
            : "border-border/70 bg-background/88 text-foreground hover:bg-secondary/70"
        )}
        onClick={() => {
          onAction?.()
          void signIn(undefined, { callbackUrl: "/dashboard" })
        }}
      >
        Sign In
      </Button>
      <Button
        asChild
        className="h-10 rounded-full border-none bg-[#b8f579] px-6 text-black shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] transition-colors hover:bg-[#a6e55d]"
      >
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

function UserMenu({ isFloating = false }: { isFloating?: boolean }) {
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
          className={cn(
            "h-11 rounded-full px-2.5 shadow-[0_18px_40px_-28px_rgba(2,10,20,0.82)] transition-colors",
            isFloating
              ? "border-white/18 bg-white/8 text-white backdrop-blur-xl hover:bg-white/14"
              : "border-border/70 bg-background/88 text-foreground hover:bg-secondary/70"
          )}
        >
          <Avatar className="mr-2 size-6">
            <AvatarImage src={session.user.image ?? undefined} alt={name} />
            <AvatarFallback className="bg-primary/15 font-semibold text-primary text-[10px] ring-1 ring-white/10">
              {getUserInitials(name, email)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-left md:block">
            <span className="block max-w-28 truncate pl-0.5 text-xs font-semibold">
              {name}
            </span>
          </span>
          <ChevronDown className="ml-1 size-3 shrink-0 opacity-70" />
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
          className="rounded-[1rem] px-3 py-3 text-red-300 focus:bg-red-500/10 focus:text-red-200"
          onSelect={(event) => {
            event.preventDefault()
            void signOut({ callbackUrl: "/" })
          }}
        >
          <LogOut className="size-4 shrink-0" />
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
  const isHome = pathname === "/"
  const isFloatingNavbar = true

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
          "pt-3 sm:pt-4"
        )}
      >
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:hidden">
          <div className="flex min-h-[4.5rem] items-center justify-between gap-3 lg:hidden">
            <div className="min-w-0">
              <SiteLogo
                className={cn(
                  "gap-3 [&>span:first-child]:size-10 [&>span:last-child>span:first-child]:hidden [&>span:last-child>span:last-child]:text-lg",
                  isFloatingNavbar &&
                    "[&>span:first-child]:border-white/18 [&>span:first-child]:bg-white/10 [&>span:first-child]:shadow-none [&>span:last-child>span:last-child]:text-white"
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <ThemeToggle
                className={cn(
                  "shadow-none",
                  isFloatingNavbar
                    ? "border-white/18 bg-white/8 text-white hover:bg-white/14 dark:border-white/18 dark:bg-white/8 dark:hover:bg-white/14"
                    : "border-border/70 bg-background/88"
                )}
              />

              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-full shadow-none",
                        isFloatingNavbar
                          ? "border-white/18 bg-white/8 text-white hover:bg-white/14"
                          : "border-border/70 bg-background/88 hover:bg-secondary/70"
                      )}
                      aria-label="Open navigation menu"
                    >
                      <Menu className="size-5 shrink-0" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[88vw] max-w-sm border-l border-white/10 bg-[#0b131c]/96 px-0 text-white shadow-[0_30px_90px_-50px_rgba(2,10,20,0.96)] backdrop-blur-2xl"
                  >
                    <SheetHeader className="border-b border-white/10 px-6 pb-5 pt-4">
                      <SiteLogo
                        className="[&>span:first-child]:border-white/18 [&>span:first-child]:bg-white/10 [&>span:first-child]:shadow-none [&>span:last-child>span:last-child]:text-white"
                      />
                      <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
                      <SheetDescription className="sr-only">
                        Browse listings and manage your account.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-1 flex-col gap-6 px-6 py-6">
                      <div className="space-y-2">
                        {primaryLinks.map(({ href, label }) => {
                          const active = isActivePath(pathname, href)

                          return (
                            <Link
                              key={href}
                              href={href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center rounded-[1.15rem] border px-4 py-3 text-sm font-medium transition-colors",
                                active
                                  ? "border-white/15 bg-white/[0.1] text-white shadow-[0_16px_36px_-26px_rgba(2,10,20,0.92)]"
                                  : "border-white/5 bg-white/[0.04] text-white/72 hover:border-white/10 hover:bg-white/[0.08] hover:text-white"
                              )}
                            >
                              <span>{label}</span>
                            </Link>
                          )
                        })}
                      </div>

                      <div className="mt-auto rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        {isAuthenticated ? (
                          <div className="space-y-3">
                            <Link
                              href="/dashboard"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
                            >
                              <LayoutDashboard className="size-4 shrink-0 text-primary" />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              href="/dashboard/profile"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
                            >
                              <UserRound className="size-4 shrink-0 text-primary" />
                              <span>Profile Settings</span>
                            </Link>
                            <Button
                              variant="destructive"
                              className="h-11 w-full rounded-[1.15rem] border border-red-500/20 bg-red-500/12 text-red-300 hover:bg-red-500/18"
                              onClick={() => {
                                setOpen(false)
                                void signOut({ callbackUrl: "/" })
                              }}
                            >
                              <LogOut className="mr-2 size-4 shrink-0" />
                              Logout
                            </Button>
                          </div>
                        ) : (
                          <AuthButtons stacked onAction={() => setOpen(false)} />
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden h-[4.75rem] w-full lg:block">
          <div className="absolute left-4 top-1/2 min-w-0 -translate-y-1/2 xl:left-6 2xl:left-8">
            <SiteLogo
              className={cn(
                "gap-3 [&>span:first-child]:size-10 [&>span:last-child>span:first-child]:hidden [&>span:last-child>span:last-child]:text-lg",
                "[&>span:first-child]:border-white/18 [&>span:first-child]:bg-white/10 [&>span:first-child]:shadow-none [&>span:last-child>span:last-child]:text-white"
              )}
            />
          </div>

          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full p-1 shadow-[0_18px_40px_-28px_rgba(2,10,20,0.92)]",
                "border border-white/18 bg-white/10 backdrop-blur-xl"
              )}
            >
              {primaryLinks.map(({ href, label }) => {
                const active = isActivePath(pathname, href)

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-w-[6.75rem] items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 xl:min-w-[7.25rem] xl:px-6",
                      active
                        ? "bg-white text-black shadow-[0_14px_28px_-18px_rgba(0,0,0,0.65)]"
                        : "text-white/84 hover:bg-white/14 hover:text-white"
                    )}
                  >
                    <span>{label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-end gap-2.5 xl:right-6 2xl:right-8">
            <ThemeToggle
              className={cn(
                "shadow-none",
                "border-white/18 bg-white/8 text-white hover:bg-white/14 dark:border-white/18 dark:bg-white/8 dark:hover:bg-white/14"
              )}
            />

            <div className="flex items-center">
              {isAuthenticated ? (
                <UserMenu isFloating={isFloatingNavbar} />
              ) : (
                <AuthButtons isFloating={isFloatingNavbar} />
              )}
            </div>
          </div>
        </div>
      </header>

      {!isHome ? <div aria-hidden="true" className="h-[5.75rem]" /> : null}
    </>
  )
}
