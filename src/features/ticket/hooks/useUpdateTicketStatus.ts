import { useTransition } from "react";
import { toast } from "sonner";

import type { TicketStatus } from "@/generated/prisma/enums";
import { updateTicketStatus } from "@/features/ticket/utils/actions";

const useUpdateTicketStatus = (id: string) => {
  const [isPending, startTransition] = useTransition();

  const handleUpdateTicketStatus = (status: TicketStatus) => {
    startTransition(async () => {
      const { success, message } = await updateTicketStatus(status, id);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return { isPending, handleUpdateTicketStatus };
};

export default useUpdateTicketStatus;
