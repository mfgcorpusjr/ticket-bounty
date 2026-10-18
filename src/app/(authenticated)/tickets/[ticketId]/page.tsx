import { redirect } from "next/navigation";

import TicketItem from "@/features/ticket/components/TicketItem";

import { getTicket } from "@/features/ticket/utils/queries";

type Props = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function TicketDetailsPage({ params }: Props) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    redirect("/tickets");
  }

  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col gap-4">
        <TicketItem isDetail ticket={ticket} />
      </div>
    </div>
  );
}
