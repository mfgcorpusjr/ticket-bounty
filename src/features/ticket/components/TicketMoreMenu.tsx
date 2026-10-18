"use client";

import { EllipsisVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { AppTicket } from "@/features/ticket/utils/types";
import useUpdateTicketStatus from "@/features/ticket/hooks/useUpdateTicketStatus";

type Props = {
  ticket: AppTicket;
};

export default function TicketMoreMenu({ ticket }: Props) {
  const { handleUpdateTicketStatus } = useUpdateTicketStatus(ticket.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleUpdateTicketStatus}
          >
            <DropdownMenuRadioItem value="OPEN">Open</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="IN_PROGRESS">
              In Progress
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="CLOSED">Closed</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
