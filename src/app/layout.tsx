import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

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
        <div className="flex flex-col h-screen">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-primary">mtgtracker</h1>
          </div>

          <main className="px-6 h-min-full">{children}</main>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
