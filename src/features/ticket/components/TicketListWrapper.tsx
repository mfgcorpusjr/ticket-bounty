import TicketSearchForm from "@/features/ticket/components/TicketSearchForm";
import TicketSorter from "@/features/ticket/components/TicketSorter";
import TicketList from "@/features/ticket/components/TicketList";
import TicketPagination from "@/features/ticket/components/TicketPagination";

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
      <div className="flex gap-2">
        <TicketSearchForm
          ticketQuery={ticketQuery}
          placeholder="Search tickets ..."
        />

        <TicketSorter ticketQuery={ticketQuery} />
      </div>

      <TicketList tickets={tickets} />

      <TicketPagination ticketQuery={ticketQuery} metadata={metadata} />
    </div>
  );
}
