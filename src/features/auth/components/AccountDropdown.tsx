import Link from "next/link";
import { BookIcon, LibraryIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SignOutButton from "@/features/auth/components/SignOutButton";

import { getSession } from "@/features/auth/utils/helpers";

export default async function AccountDropdown() {
  const session = await getSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="text-foreground font-bold uppercase">
            {session?.user.email[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={8} alignOffset={-98}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-2">
              <LibraryIcon /> All Tickets
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/tickets" className="flex items-center gap-2">
              <BookIcon /> My Tickets
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
