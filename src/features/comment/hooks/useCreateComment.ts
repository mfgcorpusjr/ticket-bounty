import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  type CreateCommentFormData,
  createCommentFormSchema,
} from "@/features/comment/utils/schemas";
import { createComment } from "@/features/comment/utils/actions";

const useCreateComment = (ticketId: string) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<CreateCommentFormData>({
    resolver: zodResolver(createCommentFormSchema),
  });

  const handleCreateComment = (formData: CreateCommentFormData) => {
    startTransition(async () => {
      const { success, message } = await createComment(formData, ticketId);

      if (success) {
        toast.success(message);

        queryClient.invalidateQueries({
          queryKey: ["tickets", ticketId, "comments"],
        });

        form.reset();
      } else {
        toast.error(message);
      }
    });
  };

  return { form, handleCreateComment, isPending };
};

export default useCreateComment;
