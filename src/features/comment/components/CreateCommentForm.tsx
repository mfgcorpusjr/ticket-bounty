"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import FormTextarea from "@/components/form/FormTextarea";
import SubmitButton from "@/components/form/SubmitButton";

import useCreateComment from "@/features/comment/hooks/useCreateComment";

type Props = {
  ticketId: string;
};

export default function CreateCommentForm({ ticketId }: Props) {
  const { form, handleCreateComment, isPending } = useCreateComment(ticketId);

  return (
    <Card className="animate-fade-in-from-top">
      <CardHeader>
        <CardTitle className="text-xl">Create Comment</CardTitle>

        <CardDescription>A new comment will be created</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleCreateComment)}
          className="flex flex-col gap-4"
        >
          <FormTextarea
            name="text"
            control={form.control}
            placeholder="What's on your mind ..."
          />

          <SubmitButton isPending={isPending}>Comment</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
