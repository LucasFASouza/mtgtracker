import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ProfileBadge } from "@/components/ProfileBadge";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientConsoleLog } from "@/components/ClientConsoleLog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mtgtracker",
  description: "A Magic: the Gathering winrate tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body>
        <ClientConsoleLog />
        <div className="flex flex-col h-screen">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">mtgtracker</h1>
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Beta version
              </p>
            </div>
            <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
              <ProfileBadge />
            </Suspense>
          </div>

          {/* Desktop-only banner */}
          <div className="hidden md:block bg-accent/20 border border-accent text-accent-foreground p-3 text-center mx-6 mb-4 rounded-md">
            <p className="font-medium">
              ⚠️ This site is optimized for mobile devices. Desktop version
              coming soon!
            </p>
          </div>

          <main className="px-6 pb-24 flex-grow">{children}</main>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
