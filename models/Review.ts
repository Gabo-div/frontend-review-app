import z from "zod";

export const reviewSchema = z.object({
  id: z.number(),
  userId: z.number(),
  placeId: z.number(),
  text: z.string(),
  rate: z.number(),
  likes: z.number(),
  dislikes: z.number(),
  comments: z.number(),
  images: z.string().array().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Review = z.infer<typeof reviewSchema>;
