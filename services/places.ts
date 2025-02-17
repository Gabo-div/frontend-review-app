import { api } from "@/lib/api";
import { Coordinate } from "@/models/Coordinate";
import {
  Place,
  PlaceDetails,
  placeDetailsSchema,
  placeSchema,
} from "@/models/Place";
import qs from "qs";
import { z } from "zod";

export const getPlaceByCoordinate = async (
  coordinate: Coordinate,
): Promise<Place> => {
  const params = {
    lat: coordinate.latitude,
    lon: coordinate.longitude,
  };

  const url = `/places/details?${qs.stringify(params)}`;
  const res = await api.get(url);

  const parsed = placeSchema.array().parse(res.data.data);

  return parsed[0];
};

export const getPlacesByQuery = async (
  query: string,
): Promise<
  (Pick<PlaceDetails, "address" | "latitude" | "longitude" | "maps_id"> & {
    name: string | null;
  })[]
> => {
  const params = {
    text: query,
  };

  const url = `/places/autocomplete?${qs.stringify(params)}`;
  const res = await api.get(url);

  if (!res.data.result) {
    return [];
  }

  const parsed = placeDetailsSchema
    .pick({ address: true, latitude: true, longitude: true, maps_id: true })
    .extend({ name: z.string().nullable() })
    .array()
    .parse(res.data.result);

  return parsed.sort((a, b) => {
    if (a.name && !b.name) {
      return -1;
    }
    if (b.name && !a.name) {
      return 1;
    }

    return 0;
  });
};
