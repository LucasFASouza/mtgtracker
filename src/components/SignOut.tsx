"use client";

import { signOutAction } from "@/actions/authActions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SignOut as SignOutIcon } from "@phosphor-icons/react/dist/ssr";

export function SignOut() {
  return (
    <form action={signOutAction}>
      <DropdownMenuItem asChild>
        <button
          type="submit"
          className="w-full flex items-center gap-2 justify-center"
        >
          <SignOutIcon size={32} weight="bold" />
          Sign out
        </button>
      </DropdownMenuItem>
    </form>
  );
}
