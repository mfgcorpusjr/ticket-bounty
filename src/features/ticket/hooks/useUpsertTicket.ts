import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  upsertTicketFormSchema,
  type UpsertTicketFormData,
} from "@/features/ticket/utils/schemas";
import type { AppTicket } from "@/features/ticket/utils/types";
import { upsertTicket } from "@/features/ticket/utils/actions";

const useUpsertTicket = (ticket?: AppTicket) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<UpsertTicketFormData>({
    resolver: zodResolver(upsertTicketFormSchema),
    defaultValues: {
      title: ticket?.title,
      content: ticket?.content,
      deadline: ticket?.deadline,
      bounty: ticket?.bounty,
    },
  });

  const handleUpsertTicket = (formData: UpsertTicketFormData) => {
    startTransition(async () => {
      const { success, message } = await upsertTicket(formData, ticket);

      if (success) {
        toast.success(message);

        if (ticket) {
          router.push(`/tickets/${ticket.id}`);
        } else {
          form.reset();
        }
      } else {
        toast.error(message);
      }
    });
  };

  return { form, handleUpsertTicket, isPending };
};

export default useUpsertTicket;
