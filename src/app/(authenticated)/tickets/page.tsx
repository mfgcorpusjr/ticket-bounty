import Heading from "@/components/Heading";
import UpsertTicketForm from "@/features/ticket/components/UpsertTicketForm";

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <div className="w-full max-w-xl mx-auto">
        <UpsertTicketForm />
      </div>
    </div>
  );
}
