import { useQuery } from "@tanstack/react-query";
import {
  getPlaceByCoordinate,
  getPlaceByMapsId,
  getPlaceById,
} from "@/services/places";
import { Coordinate } from "@/models/Coordinate";

export default function usePlace(query: number | string | Coordinate) {
  return useQuery({
    queryKey: ["place", query],
    queryFn: async () => {
      if (typeof query === "number") {
        return getPlaceById(query);
      } else if (typeof query === "string") {
        return getPlaceByMapsId(query);
      } else {
        return getPlaceByCoordinate(query);
      }
    },
  });
}
