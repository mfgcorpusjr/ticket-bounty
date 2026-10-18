import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/features/comment/utils/actions";

const useDeleteComment = (id: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleDeleteComment = () => {
    startTransition(async () => {
      const { success, message } = await deleteComment(id);

      if (success) {
        toast.success(message);
        queryClient.invalidateQueries({
          queryKey: ["tickets"],
        });
        setIsSuccess(true);
      } else {
        toast.error(message);
      }
    });
  };

  return { isPending, handleDeleteComment, isSuccess };
};

export default useDeleteComment;
