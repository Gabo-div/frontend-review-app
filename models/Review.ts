import z from "zod";

export const reviewSchema = z.object({
  image: z.string().optional(),
  content: z.string(),
  place: z.string(),
  avatar: z.string(),
  name: z.string(),
  username: z.string(),
  likes: z.number(),
  dislikes: z.number(),
  comments: z.number(),
});

export type Review = z.infer<typeof reviewSchema>;
