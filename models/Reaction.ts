import z from "zod";

export const reactionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  contentId: z.number(),
  contentType: z.enum(["review", "comment", "answer"]),
  reactionType: z.enum(["like", "dislike"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Reaction = z.infer<typeof reactionSchema>;
