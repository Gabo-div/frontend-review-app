import { Place } from "@/models/Place";
import { ArrowUpRight, MapPin } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Text, View } from "tamagui";

interface Props {
  place: Place;
}

export default function PlaceCard({ place }: Props) {
  return (
    <Link
      asChild
      href={{
        pathname: "/place",
        params: { mapsId: place.details.maps_id },
      }}
    >
      <View borderRadius="$4" padding="$4" backgroundColor="$color2" gap="$2">
        <View flexDirection="row" gap="$2" alignItems="center" flex={1}>
          <Text>{place.details.name}</Text>
          <ArrowUpRight size="$1" />
        </View>

        <View flexDirection="row" gap="$2" alignItems="center" flex={1}>
          <MapPin size={15} color="$green11" />
          <View flex={1}>
            <Text
              color="$color11"
              fontSize="$2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {place.details.address}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}
