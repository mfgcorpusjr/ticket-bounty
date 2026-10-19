import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import UpsertTicketForm from "@/features/ticket/components/UpsertTicketForm";
import TicketListWrapper from "@/features/ticket/components/TicketListWrapper";

import { getSession } from "@/features/auth/utils/helpers";

export default async function TicketsPage() {
  const session = await getSession();

  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <div className="w-full max-w-xl mx-auto">
        <UpsertTicketForm
          title="Create Ticket"
          description="A new ticket will be created"
        />
      </div>

      <Suspense fallback={<Spinner />}>
        <TicketListWrapper userId={session?.user.id} />
      </Suspense>
    </div>
  );
}
