"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { api } from "~/utils/api";

export const siteConfig = {
  name: "MTG Companion",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: "https://tx.shadcn.com",
  links: {
    github: "https://github.com/genadi53",
  },
} as const;

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  creator: "genadi53",
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
