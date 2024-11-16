import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  passwoord: z.string(),
  description: z.string(),
  followersCount: z.number(),
  followedCount: z.number(),
  postCount: z.number(),
});

export type User = z.infer<typeof userSchema>;
