"use client";

import useSignOut from "@/features/auth/hooks/useSignOut";

export default function SignOutButton() {
  const { isPending, handleSignOut } = useSignOut();

  return (
    <button
      className="w-full text-left"
      disabled={isPending}
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}
