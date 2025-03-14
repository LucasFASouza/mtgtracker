"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ListDashes,
  PlusSquare,
  ChartLine,
} from "@phosphor-icons/react/dist/ssr";
import TabIcon from "@/components/TabIcon";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t-2 bg-background p-1 flex justify-center">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
          pathname === "/" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={ListDashes} isActive={pathname === "/"} />
        Matches History
      </Link>

      <Link
        href="/register"
        className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
          pathname === "/register" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={PlusSquare} isActive={pathname === "/register"} />
        Register Match
      </Link>

      <Link
        href="/analytics"
        className={`flex-1 flex flex-col items-center font-medium text-xs px-2 py-1 ${
          pathname === "/analytics"
            ? "text-foreground"
            : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={ChartLine} isActive={pathname === "/analytics"} />
        Analytics
      </Link>
    </div>
  );
}
