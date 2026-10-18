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
import FormDatePicker from "@/components/form/FormDatePicker";
import SubmitButton from "@/components/form/SubmitButton";

import useUpsertTicket from "@/features/ticket/hooks/useUpsertTicket";
import type { AppTicket } from "@/features/ticket/utils/types";

type Props = {
  title: string;
  description: string;
  ticket?: AppTicket;
};

export default function UpsertTicketForm({
  title,
  description,
  ticket,
}: Props) {
  const { form, handleUpsertTicket, isPending } = useUpsertTicket(ticket);

  return (
    <Card className="animate-fade-in-from-top">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleUpsertTicket)}
          className="flex flex-col gap-4"
        >
          <FormInput name="title" control={form.control} label="Title" />

          <FormTextarea name="content" control={form.control} label="Content" />

          <FormDatePicker
            name="deadline"
            control={form.control}
            label="Deadline"
          />

          <FormInput name="bounty" control={form.control} label="Bounty" />

          <SubmitButton isPending={isPending}>
            {ticket ? "Update" : "Create"}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
