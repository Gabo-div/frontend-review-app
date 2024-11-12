import { z } from "zod";

export const coordinateSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type Coordinate = z.infer<typeof coordinateSchema>;
