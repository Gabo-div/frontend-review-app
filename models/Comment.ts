import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  reviewId: z.number(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Comment = z.infer<typeof commentSchema>;

export const replySchema = z.object({
  id: z.number(),
  userId: z.number(),
  commentId: z.number(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Reply = z.infer<typeof replySchema>;
