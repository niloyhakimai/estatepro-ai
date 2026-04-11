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
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppProviders session={session}>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_left,rgba(21,159,149,0.14),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(199,153,83,0.12),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(41,194,179,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(215,171,99,0.14),transparent_24%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(237,242,246,0.55),transparent_26%,rgba(237,242,246,0.86))] dark:bg-[linear-gradient(180deg,rgba(6,10,15,0.92),rgba(6,10,15,0.82)_28%,rgba(6,10,15,0.98))]"
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
