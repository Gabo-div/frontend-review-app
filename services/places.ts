import { Coordinate } from "@/models/Coordinate";
import { Place, placeSchema } from "@/models/Place";
import axios from "axios";
import qs from "qs";

export const getPlaceByCoordinate = async (
  coordinate: Coordinate,
): Promise<Place> => {
  const params = {
    lat: coordinate.latitude,
    lon: coordinate.longitude,
  };

  const url = `${process.env.API_URL}/places?${qs.stringify(params)}`;
  const res = await axios.get(url);

  const parsed = placeSchema.array().parse(res.data.data);

  return parsed[0];
};
