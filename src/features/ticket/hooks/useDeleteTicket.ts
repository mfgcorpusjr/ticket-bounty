import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteTicket } from "@/features/ticket/utils/actions";

const useDeleteTicket = (id: string) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteTicket = () => {
    startTransition(async () => {
      const { success, message } = await deleteTicket(id);

      if (success) {
        toast.success(message);
        router.push("/tickets");
      } else {
        toast.error(message);
      }
    });
  };

  return { isPending, handleDeleteTicket };
};

export default useDeleteTicket;
