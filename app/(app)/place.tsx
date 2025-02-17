import PlaceDetails from "@/components/PlaceDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Place() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
  }>();

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const parsedLatitude = parseFloat(params?.latitude || "");
    const parsedLongitude = parseFloat(params?.longitude || "");

    if (!parsedLatitude || !parsedLongitude) {
      router.replace("/");
    }

    setLatitude(parsedLatitude);
    setLongitude(parsedLongitude);
  }, [router, params]);

  if (!latitude || !longitude) {
    return null;
  }

  return (
    <PlaceDetails
      coordinate={{
        latitude,
        longitude,
      }}
    />
  );
}
