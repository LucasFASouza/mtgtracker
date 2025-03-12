"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, PlusCircle, ChartBar } from "@phosphor-icons/react/dist/ssr";
import TabIcon from "@/components/TabIcon";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t-2 bg-background p-1 flex justify-center">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={Archive} isActive={pathname === "/"} />
        Matches History
      </Link>

      <Link
        href="/register"
        className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
          pathname === "/register" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={PlusCircle} isActive={pathname === "/register"} />
        Register Match
      </Link>

      <Link
        href="/analytics"
        className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
          pathname === "/analytics" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={ChartBar} isActive={pathname === "/analytics"} />
        Analytics
      </Link>
    </div>
  );
}
