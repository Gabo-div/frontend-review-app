import PlaceDetails from "@/components/PlaceDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Place() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    mapsId?: string;
  }>();

  useEffect(() => {
    if (!params.mapsId) {
      router.replace("/");
    }
  }, [router, params]);

  if (!params.mapsId) {
    return null;
  }

  return <PlaceDetails query={params.mapsId} />;
}
