"use client";

import React, { useState, useEffect } from "react";
import { SignOut } from "@/components/SignOut";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Session {
  user?: {
    id?: string;
    name?: string;
    image?: string;
  };
}

export const ProfileBadge = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Failed to get session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  // Don't render on login page
  if (pathname === "/login") {
    return null;
  }

  // Show loading state
  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>;
  }

  if (!session?.user) {
    return (
      <Button asChild size="sm">
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>
            {session.user.name?.at(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
