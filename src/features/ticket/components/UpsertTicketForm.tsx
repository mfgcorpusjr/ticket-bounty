"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import useUpsertTicket from "@/features/ticket/hooks/useUpsertTicket";

type Props = {
  id?: string;
};

export default function UpsertTicketForm({ id }: Props) {
  const { form, handleUpsertTicket, isPending } = useUpsertTicket(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Create Ticket</CardTitle>
        <CardDescription>A new ticket will be created</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleUpsertTicket)}
          className="flex flex-col gap-4"
        >
          <FormInput name="title" control={form.control} label="Title" />

          <FormTextarea name="content" control={form.control} label="Content" />

          <FormInput
            name="deadline"
            control={form.control}
            label="Deadline"
            type="date"
          />

          <FormInput
            name="bounty"
            control={form.control}
            label="Bounty"
            type="number"
            min={1}
          />

          <Button disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
