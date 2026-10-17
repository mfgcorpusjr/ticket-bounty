import { FileTextIcon, PencilIcon, CircleCheckIcon } from "lucide-react";

import type { AppTicket } from "@/features/ticket/utils/types";

type Props = {
  ticket: AppTicket;
};

export default function TicketItemTitle({ ticket }: Props) {
  const iconMap = {
    OPEN: <FileTextIcon />,
    IN_PROGRESS: <PencilIcon />,
    CLOSED: <CircleCheckIcon />,
  };

  return (
    <h4 className="flex items-center gap-2">
      {iconMap[ticket.status]} {ticket.title}
    </h4>
  );
}
