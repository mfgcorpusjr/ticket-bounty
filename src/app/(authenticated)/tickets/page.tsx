import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import UpsertTicketForm from "@/features/ticket/components/UpsertTicketForm";
import TicketListWrapper from "@/features/ticket/components/TicketListWrapper";

import { getSession } from "@/features/auth/utils/helpers";
import type { TicketQuery } from "@/features/ticket/utils/types";

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    orderBy?: string;
  }>;
};

export default async function TicketsPage({ searchParams }: Props) {
  const session = await getSession();

  const resolvedSearchParams = await searchParams;

  const ticketQuery: TicketQuery = {
    page: Number(resolvedSearchParams.page) || 1,
    pageSize: Number(resolvedSearchParams.pageSize) || 5,
    search: resolvedSearchParams.search,
    orderBy: resolvedSearchParams.orderBy || "newest",
  };

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
        <TicketListWrapper
          ticketQuery={ticketQuery}
          userId={session?.user.id}
        />
      </Suspense>
    </div>
  );
}
