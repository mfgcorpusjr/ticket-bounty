import { cn } from "cn";
import { FileTextIcon, PencilIcon, CircleCheckIcon } from "lucide-react";

import type { AppTicket } from "@/features/ticket/utils/types";

type Props = {
  ticket: AppTicket;
  isDetail?: boolean;
};

export default function TicketItemTitle({ ticket, isDetail }: Props) {
  const iconMap = {
    OPEN: <FileTextIcon />,
    IN_PROGRESS: <PencilIcon />,
    CLOSED: <CircleCheckIcon />,
  };

  return (
    <div className="flex items-start gap-2">
      {iconMap[ticket.status]}

      <h4 className={cn("flex-1", { "line-clamp-1": !isDetail })}>
        {ticket.title}
      </h4>
    </div>
  );
}
