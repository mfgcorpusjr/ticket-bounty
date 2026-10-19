import TicketList from "@/features/ticket/components/TicketList";
import Pagination from "@/components/Pagination";

import { getTickets } from "@/features/ticket/utils/queries";

type Props = {
  userId?: string;
};

export default async function TicketListWrapper({ userId }: Props) {
  const tickets = await getTickets(userId);

  return (
    <div className="w-full max-w-xl mx-auto flex-1 flex flex-col gap-4">
      <TicketList tickets={tickets} />

      <Pagination />
    </div>
  );
}
