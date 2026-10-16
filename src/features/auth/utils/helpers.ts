import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export const getSessionOrRedirect = cache(async () => {
  const session = await getSession();

  if (session) return session;

  redirect("/");
});
