import Link from "next/link";
import { KanbanIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import AccountDropdown from "@/features/auth/components/AccountDropdown";
import ThemeSwitcher from "@/features/theme/components/ThemeSwitcher";

import { getSession } from "@/features/auth/utils/helpers";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b py-4">
      <Container className="flex justify-between items-center">
        <Button asChild variant="ghost">
          <Link href="/">
            <KanbanIcon />

            <h1 className="text-lg font-bold tracking-tight">TicketBounty</h1>
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          {session ? (
            <AccountDropdown />
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/sign-up">Sign Up</Link>
              </Button>

              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
}
