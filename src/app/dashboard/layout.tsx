import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { requireDashboardSession } from "@/components/dashboard/dashboard-auth"
import { prisma } from "@/lib/prisma"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireDashboardSession("/dashboard")
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      image: true,
      name: true,
    },
  })

  return (
    <DashboardShell
      role={session.user.role}
      user={{
        email: dbUser?.email ?? session.user.email,
        image: dbUser?.image ?? session.user.image,
        name: dbUser?.name ?? session.user.name,
      }}
    >
      {children}
    </DashboardShell>
  )
}
