import { api } from "@/lib/api";
import { Coordinate } from "@/models/Coordinate";
import { Place, placeSchema } from "@/models/Place";
import qs from "qs";

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
