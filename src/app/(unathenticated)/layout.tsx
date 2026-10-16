import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/utils/helpers";

type Props = {
  children: ReactNode;
};

export default async function UnauthenticatedLayout({ children }: Props) {
  const session = await getSession();

  if (session) {
    redirect("/tickets");
  }

  return children;
}
