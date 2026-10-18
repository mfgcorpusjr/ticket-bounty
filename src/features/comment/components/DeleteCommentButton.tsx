"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";
import SubmitButton from "@/components/form/SubmitButton";

import useDeleteComment from "@/features/comment/hooks/useDeleteComment";

type Props = {
  id: string;
};

export default function DeleteCommentButton({ id }: Props) {
  const [open, setOpen] = useState(false);
  const { isPending, handleDeleteComment, isSuccess } = useDeleteComment(id);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
      }
    >
      <SubmitButton isPending={isPending} onClick={handleDeleteComment}>
        Delete
      </SubmitButton>
    </ConfirmDialog>
  );
}
