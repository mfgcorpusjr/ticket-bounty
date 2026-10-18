"use client";

import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";
import SubmitButton from "@/components/form/SubmitButton";

import useDeleteTicket from "@/features/ticket/hooks/useDeleteTicket";

type Props = {
  id: string;
};

export default function DeleteTicketButton({ id }: Props) {
  const { isPending, handleDeleteTicket } = useDeleteTicket(id);

  return (
    <ConfirmDialog
      trigger={
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
      }
    >
      <SubmitButton isPending={isPending} onClick={handleDeleteTicket}>
        Delete
      </SubmitButton>
    </ConfirmDialog>
  );
}
