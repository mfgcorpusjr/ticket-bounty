import Placeholder from "@/components/Placeholder";
import TicketItem from "@/features/ticket/components/TicketItem";

import { getTickets } from "@/features/ticket/utils/queries";

export default async function TicketList() {
  const tickets = await getTickets();

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
