import SearchForm from "@/components/SearchForm";
import TicketList from "@/features/ticket/components/TicketList";
import Pagination from "@/components/Pagination";

import { getTickets } from "@/features/ticket/utils/queries";
import type { TicketQuery } from "@/features/ticket/utils/types";

type Props = {
  ticketQuery: TicketQuery;
  userId?: string;
};

export default async function TicketListWrapper({
  ticketQuery,
  userId,
}: Props) {
  const { tickets, metadata } = await getTickets(ticketQuery, userId);

  return (
    <div className="w-full max-w-xl mx-auto flex-1 flex flex-col gap-4">
      <SearchForm ticketQuery={ticketQuery} placeholder="Search tickets ..." />

      <TicketList tickets={tickets} />

      <Pagination ticketQuery={ticketQuery} metadata={metadata} />
    </div>
  );
}
