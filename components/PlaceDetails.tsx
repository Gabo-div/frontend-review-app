import { Bookmark, MessageSquarePlus } from "@tamagui/lucide-icons";
import { Button, ScrollView, Spinner, Text, View } from "tamagui";

import PlaceDetailsContacts from "./PlaceDetailsContacts";
import { Coordinate } from "@/models/Coordinate";
import usePlace from "@/hooks/usePlace";
import PlaceReviews from "./PlaceReviews";
import { Link } from "expo-router";

interface Props {
  query: string | number | Coordinate;
}

export default function PlaceDetails({ query }: Props) {
  const { data, isLoading, error, refetch } = usePlace(query);

  return (
    <View width="100%" height="100%">
      {isLoading ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$color" />
        </View>
      ) : null}

      {error ? (
        <View
          flex={1}
          alignItems="center"
          justifyContent="center"
          paddingHorizontal="$4"
          gap="$4"
        >
          <Text textWrap="balance" textAlign="center" color="$red11">
            Ha ocurrido un error obteniendo la información del lugar.
          </Text>
          <Button onPress={() => refetch()}>Reintentar</Button>
        </View>
      ) : null}

      {data ? (
        <View flex={1}>
          <View
            gap="$2"
            borderBottomColor="$borderColor"
            borderBottomWidth="$0.5"
            padding="$4"
          >
            <Text fontSize="$8" numberOfLines={2}>
              {data.details.name}
            </Text>
            <Text fontSize="$4" color="$color11" textTransform="capitalize">
              {data.details.category.replaceAll("_", " ")}
            </Text>

            <View marginTop="$2">
              <ScrollView horizontal>
                <View flexDirection="row" gap="$2">
                  <Link
                    asChild
                    href={{
                      pathname: "/post",
                      params: {
                        address: data.details.address,
                        mapsId: data.details.maps_id,
                        name: data.details.name,
                      },
                    }}
                  >
                    <Button
                      themeInverse
                      size="$3.5"
                      icon={<MessageSquarePlus />}
                    >
                      Publicar
                    </Button>
                  </Link>
                  <Button size="$3.5" icon={<Bookmark />}>
                    Guardar
                  </Button>
                </View>
              </ScrollView>
            </View>
          </View>

          <ScrollView>
            <View gap="$4" paddingVertical="$4" paddingBottom="$13">
              <PlaceDetailsContacts
                address={data.details.address}
                contacts={data.details.contacts}
              />

              <View>
                <Text paddingHorizontal="$4">Reseñas</Text>
                <PlaceReviews placeId={data.id} />
              </View>
            </View>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
