import Placeholder from "@/components/Placeholder";
import TicketItem from "@/features/ticket/components/TicketItem";

import { getTickets } from "@/features/ticket/utils/queries";

type Props = {
  userId?: string;
};

export default async function TicketList({ userId }: Props) {
  const tickets = await getTickets(userId);

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
