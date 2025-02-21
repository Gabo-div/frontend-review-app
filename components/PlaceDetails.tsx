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
  Spinner,
  Text,
  View,
  useTheme,
} from "tamagui";
import ReviewCard from "./home/ReviewCard";

import PlaceDetailsContacts from "./PlaceDetailsContacts";
import { getPlaceByCoordinate } from "@/services/places";
import { Review } from "@/models/Review";
import { Coordinate } from "@/models/Coordinate";

interface Props {
  coordinate: Coordinate;
}

const reviews: Review[] = [
  {
    id: 1,
    placeId: 1,
    userId: 1,
    rate: 3.5,
    images: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    text: "El servicio es otro nivel. Los meseros son súper amables y atentos. Te hacen sentir como en casa desde el momento en que entras por la puerta.",
    likes: 20,
    dislikes: 10,
    comments: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    placeId: 1,
    userId: 3,
    rate: 5,
    images: [],
    text: "El parque es un verdadero refugio para los amantes de la naturaleza. Con senderos bien cuidados que serpentean a través de densos bosques y prados abiertos, es el lugar ideal para una caminata relajante.",
    likes: 20,
    dislikes: 10,
    comments: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function PlaceDetails({ coordinate }: Props) {
  const theme = useTheme();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["place", coordinate],
    queryFn: () => getPlaceByCoordinate(coordinate),
  });

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
            </View>

            <View marginTop="$2">
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

          <View flex={1}>
            <ScrollView>
              <View gap="$4" paddingTop="$4">
                <PlaceDetailsContacts
                  address={data.details.address}
                  contacts={data.details.contacts}
                />

                <View>
                  <ScrollView horizontal>
                    <View flexDirection="row" gap="$4" paddingHorizontal="$4">
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
                <View gap="$4" paddingHorizontal="$4">
                  {reviews.map((data, i) => (
                    <ReviewCard data={data} key={i} elevation={4} />
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
