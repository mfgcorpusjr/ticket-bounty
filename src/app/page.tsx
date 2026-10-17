import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import TicketList from "@/features/ticket/components/TicketList";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col gap-4">
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
    </div>
  );
}
