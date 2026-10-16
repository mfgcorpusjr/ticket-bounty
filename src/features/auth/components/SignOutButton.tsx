"use client";

import useSignOut from "@/features/auth/hooks/useSignOut";

export default function SignOutButton() {
  const { isPending, handleSignOut } = useSignOut();

  return (
    <button disabled={isPending} onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
