"use client";

import React, { useEffect, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch session status from the server using a simple endpoint
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setIsLoggedIn(!!data.user);
      } catch (error) {
        console.error("Failed to check authentication status:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Don't render navbar on login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t-2 bg-background p-1 flex justify-center">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={ListDashes} isActive={pathname === "/"} />
        Matches History
      </Link>

      {isLoggedIn ? (
        <Link
          href="/register"
          className={`flex-1 flex flex-col items-center text-xs px-2 py-1 ${
            pathname === "/register" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <TabIcon icon={PlusSquare} isActive={pathname === "/register"} />
          Register Match
        </Link>
      ) : (
        <Link
          href="/login"
          className={`flex-1 flex flex-col items-center text-xs px-2 py-1 text-muted-foreground`}
        >
          <TabIcon icon={PlusSquare} isActive={false} />
          Register Match
        </Link>
      )}

      <Link
        href="/analytics"
        className={`flex-1 flex flex-col items-center font-medium text-xs px-2 py-1 ${
          pathname === "/analytics" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <TabIcon icon={ChartLine} isActive={pathname === "/analytics"} />
        Analytics
      </Link>
    </div>
  );
}
