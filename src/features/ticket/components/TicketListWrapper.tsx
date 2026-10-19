import TicketList from "@/features/ticket/components/TicketList";
import Pagination from "@/components/Pagination";

type Props = {
  userId?: string;
};

export default function TicketListWrapper({ userId }: Props) {
  return (
    <div className="w-full max-w-xl mx-auto flex-1 flex flex-col gap-4">
      <TicketList userId={userId} />

      <Pagination />
    </div>
  );
}
