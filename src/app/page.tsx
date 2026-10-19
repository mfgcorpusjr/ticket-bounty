import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import TicketListWrapper from "@/features/ticket/components/TicketListWrapper";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <TicketListWrapper />
      </Suspense>
    </div>
  );
}
