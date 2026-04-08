import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { ChatWidget } from "@/components/ai/chat-widget";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { AppProviders } from "@/components/providers/app-providers";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EstatePro",
    template: "%s | EstatePro",
  },
  description:
    "EstatePro pairs polished real-estate discovery with secure authentication, concierge-grade navigation, and a refined investor-ready interface.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppProviders session={session}>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.16),transparent_34%),radial-gradient(circle_at_78%_14%,rgba(200,148,67,0.14),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(37,177,166,0.18),transparent_32%),radial-gradient(circle_at_78%_14%,rgba(211,166,92,0.14),transparent_26%)]"
            />
            <SiteNavbar />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <ChatWidget />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
