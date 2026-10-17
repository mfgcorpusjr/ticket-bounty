import { z } from "zod";

export const upsertTicketFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { error: "Title must be at least 3 characters" })
    .max(191, { error: "Title cannot be longer than 191 characters" }),
  content: z
    .string()
    .trim()
    .min(3, { error: "Content must be at least 3 characters" })
    .max(1000, { error: "Content cannot be longer than 1000 characters" }),
  deadline: z.coerce
    .date()
    .min(new Date(), { error: "Deadline must be today or later" }),
  bounty: z.coerce
    .number()
    .min(1, { error: "Bounty must be at least 1" })
    .max(1_000_000, { error: "Bounty cannot be greater than 1,000,000" }),
});

export type UpsertTicketFormData = z.infer<typeof upsertTicketFormSchema>;
