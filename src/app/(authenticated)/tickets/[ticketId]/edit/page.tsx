import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import UpsertTicketForm from "@/features/ticket/components/UpsertTicketForm";

import { getTicket } from "@/features/ticket/utils/queries";
import { getSession } from "@/features/auth/utils/helpers";
import { isOwner } from "@/utils/entity";

type Props = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function EditTicketPage({ params }: Props) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  const session = await getSession();

  if (!ticket || !isOwner(session!.user.id, ticket)) {
    redirect("/tickets");
  }

  const breadcrumbItems = [
    { label: "Tickets", href: "/tickets" },
    { label: ticket.title, href: `/tickets/${ticket.id}` },
    { label: "Update" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex-1 flex flex-col justify-center w-full max-w-xl mx-auto">
        <UpsertTicketForm
          title="Update Ticket"
          description="Update an existing ticket"
          ticket={ticket!}
        />
      </div>
    </div>
  );
}
