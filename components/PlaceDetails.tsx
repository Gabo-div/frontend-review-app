import { POI } from "@/models/POI";
import { Place } from "@/models/Place";
import {
  Bookmark,
  CornerUpRight,
  MessageSquarePlus,
  Star,
} from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Image,
  ScrollView,
  Separator,
  Spinner,
  Text,
  View,
  useTheme,
} from "tamagui";
import Review from "./home/Review";

interface Props {
  POI: POI;
}

export default function PlaceDetails({ POI }: Props) {
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["place", POI.placeId],
    queryFn: () =>
      new Promise<Place>((resolve) =>
        setTimeout(
          () =>
            resolve({
              name: POI.name,
              placeId: POI.placeId,
              coordinate: POI.coordinate,
            }),
          1000,
        ),
      ),
  });

  return (
    <View width="100%" height="100%">
      {isLoading ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$color" />
        </View>
      ) : null}
      {data ? (
        <View>
          <View
            gap="$4"
            borderBottomColor="$borderColor"
            borderBottomWidth="$0.5"
            padding="$4"
          >
            <Text fontSize="$8" numberOfLines={2}>
              {data.name}
            </Text>
            <View gap="$1.5">
              <View flexDirection="row" alignItems="center" gap="$2">
                <Text fontSize="$1" color="$color11">
                  5.0
                </Text>
                <View flexDirection="row" gap="$1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      fill={theme.yellow9.get()}
                      strokeWidth={0}
                      size={14}
                    />
                  ))}
                </View>
                <Text fontSize="$1" color="$color11">
                  (83)
                </Text>
              </View>
              <Text fontSize="$1" color="$color11">
                Centro comercial
              </Text>
              <View flexDirection="row" gap="$2" alignItems="center">
                <Text fontSize="$1" color="$red11">
                  Cerrado
                </Text>
                <Separator
                  alignSelf="stretch"
                  vertical
                  borderColor="$color8"
                  marginVertical="$1"
                />
                <Text fontSize="$1" color="$color11">
                  Abre a las 9 AM
                </Text>
              </View>
            </View>
            <View>
              <ScrollView horizontal>
                <View flexDirection="row" gap="$2">
                  <Button themeInverse size="$3.5" icon={<MessageSquarePlus />}>
                    Publicar
                  </Button>
                  <Button size="$3.5" icon={<CornerUpRight />}>
                    Direcciones
                  </Button>
                  <Button size="$3.5" icon={<Bookmark />}>
                    Guardar
                  </Button>
                </View>
              </ScrollView>
            </View>
          </View>

          <View height="100%">
            <ScrollView>
              <View gap="$4">
                <View>
                  <ScrollView horizontal>
                    <View flexDirection="row" gap="$4" padding="$4">
                      <View
                        borderRadius="$radius.4"
                        overflow="hidden"
                        height="$20"
                        aspectRatio="1/1"
                      >
                        <Image
                          source={{
                            uri: "https://picsum.photos/600/600",
                            width: 200,
                            height: 300,
                          }}
                          width="100%"
                          height="100%"
                        />
                      </View>
                      <View
                        borderRadius="$radius.4"
                        overflow="hidden"
                        height="$20"
                        aspectRatio="1/1"
                      >
                        <Image
                          source={{
                            uri: "https://picsum.photos/600/800",
                            width: 200,
                            height: 300,
                          }}
                          width="100%"
                          height="100%"
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>

                <Text paddingHorizontal="$4">Reseñas</Text>
                <View gap="$4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Review key={i} />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      ) : null}
    </View>
  );
}
