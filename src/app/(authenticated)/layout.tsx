import { ReactNode } from "react";

import { getSessionOrRedirect } from "@/features/auth/utils/helpers";

type Props = {
  children: ReactNode;
};

export default async function AuthenticatedLayout({ children }: Props) {
  await getSessionOrRedirect();

  return children;
}
