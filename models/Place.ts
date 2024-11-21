import { z } from "zod";

const placeContactsSchema = z.object({
  mobile: z.string().nullish(),
  website: z.string().nullish(),
  email: z.string().nullish(),
  facebook: z.string().nullish(),
  twitter: z.string().nullish(),
  instagram: z.string().nullish(),
});

export type PlaceContacts = z.infer<typeof placeContactsSchema>;

const placeDetailsSchema = z.object({
  name: z.string(),
  maps_id: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  contacts: placeContactsSchema,
});

export type PlaceDetails = z.infer<typeof placeDetailsSchema>;

export const placeSchema = z.object({
  id: z.number(),
  details: placeDetailsSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Place = z.infer<typeof placeSchema>;
