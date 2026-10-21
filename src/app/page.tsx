import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import TicketListWrapper from "@/features/ticket/components/TicketListWrapper";

import type { TicketQuery } from "@/features/ticket/utils/types";

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
};

export default async function HomePage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const ticketQuery: TicketQuery = {
    page: Number(resolvedSearchParams.page) || 1,
    pageSize: Number(resolvedSearchParams.pageSize) || 5,
    search: resolvedSearchParams.search,
  };

  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <TicketListWrapper ticketQuery={ticketQuery} />
      </Suspense>
    </div>
  );
}
