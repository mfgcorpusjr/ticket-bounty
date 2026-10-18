"use client";

import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";

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
      <Button disabled={isPending} onClick={handleDeleteTicket}>
        {isPending && <Spinner data-icon="inline-start" />}
        Delete
      </Button>
    </ConfirmDialog>
  );
}
