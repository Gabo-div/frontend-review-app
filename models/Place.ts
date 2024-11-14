import { z } from "zod";
import { coordinateSchema } from "./Coordinate";

export const placeSchema = z.object({
  name: z.string(),
  placeId: z.string(),
  coordinate: coordinateSchema,
});

export type Place = z.infer<typeof placeSchema>;
