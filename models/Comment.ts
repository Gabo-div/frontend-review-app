import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  reviewId: z.number(),
  text: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  answersCount: z.number(),
  likesCount: z.number(),
  dislikesCount: z.number(),
});

export type Comment = z.infer<typeof commentSchema>;

export const replySchema = z.object({
  id: z.number(),
  userId: z.number(),
  commentId: z.number(),
  text: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  likesCount: z.number(),
  dislikesCount: z.number(),
});

export type Reply = z.infer<typeof replySchema>;
