import Placeholder from "@/components/Placeholder";
import TicketItem from "@/features/ticket/components/TicketItem";

import type { AppTicket } from "@/features/ticket/utils/types";

type Props = {
  tickets: (AppTicket & { user: { email: string } })[];
};

export default async function TicketList({ tickets }: Props) {
  if (tickets.length === 0) {
    return <Placeholder text="No ticket found" />;
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
