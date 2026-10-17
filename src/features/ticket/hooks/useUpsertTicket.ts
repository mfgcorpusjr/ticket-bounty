import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  upsertTicketFormSchema,
  type UpsertTicketFormData,
} from "@/features/ticket/utils/schemas";
import { upsertTicket } from "@/features/ticket/utils/actions";

const useUpsertTicket = (id?: string) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<UpsertTicketFormData>({
    resolver: zodResolver(upsertTicketFormSchema),
  });

  const handleUpsertTicket = (formData: UpsertTicketFormData) => {
    startTransition(async () => {
      const { success, message } = await upsertTicket(formData, id);

      if (success) {
        toast.success(message);
        form.reset();
      } else {
        toast.error(message);
      }

      if (id) {
        router.push(`/tickets/${id}`);
      }
    });
  };

  return { form, handleUpsertTicket, isPending };
};

export default useUpsertTicket;
