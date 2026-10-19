import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import TicketItem from "@/features/ticket/components/TicketItem";
import CreateCommentForm from "@/features/comment/components/CreateCommentForm";
import CommentList from "@/features/comment/components/CommentList";

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

  const breadcrumbItems = [
    { label: "Tickets", href: "/tickets" },
    { label: ticket.title },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="w-full max-w-xl mx-auto space-y-8">
        <TicketItem isDetail ticket={ticket} />

        <CreateCommentForm ticketId={ticket.id} />

        <CommentList ticketId={ticket.id} />
      </div>
    </div>
  );
}
