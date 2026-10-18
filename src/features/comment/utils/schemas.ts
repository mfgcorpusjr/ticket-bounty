import { z } from "zod";

export const createCommentFormSchema = z.object({
  text: z
    .string({ error: "Text is required" })
    .trim()
    .min(3, { error: "Text must be at least 3 characters" })
    .max(1000, { error: "Text cannot be longer than 1000 characters" }),
});

export type CreateCommentFormData = z.infer<typeof createCommentFormSchema>;
