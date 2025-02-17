import { getPlacesByQuery } from "@/services/places";
import { ArrowUpLeft, MapPin } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Input, ScrollView, Separator, Spinner, Text, View } from "tamagui";

export default function Search() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["places", query],
    queryFn: () => getPlacesByQuery(query),
    enabled: !!query,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(input);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return (
    <View flex={1}>
      <View paddingHorizontal="$4" paddingTop="$4" paddingBottom="$2">
        <Input
          placeholder="Busca un lugar..."
          width="100%"
          size="$4"
          value={input}
          onChangeText={setInput}
          autoFocus
        />
      </View>
      <ScrollView paddingHorizontal="$4">
        {error ? (
          <View paddingVertical="$4">
            <Text color="$color11" textAlign="center">
              Ocurrió un error
            </Text>
          </View>
        ) : null}
        {isLoading ? (
          <View paddingVertical="$4">
            <Spinner size="large" color="$color" />
          </View>
        ) : null}
        {!isLoading && data && !data.length ? (
          <View paddingVertical="$4">
            <Text color="$color11" textAlign="center">
              No se encontraron resultados
            </Text>
          </View>
        ) : null}
        {!isLoading && data
          ? data.map((place) => (
              <Link
                key={place.address}
                href={{
                  pathname: "/place",
                  params: {
                    latitude: place.latitude,
                    longitude: place.longitude,
                  },
                }}
                style={{ width: "100%" }}
              >
                <View width="100%">
                  <View
                    flexDirection="row"
                    paddingVertical="$4"
                    alignItems="center"
                  >
                    <View
                      borderRadius="100%"
                      backgroundColor="$color8"
                      padding="$2"
                      marginRight="$2"
                    >
                      <MapPin />
                    </View>
                    <View flex={1}>
                      {place.name ? (
                        <Text numberOfLines={1} ellipsizeMode="tail">
                          {place.name}
                        </Text>
                      ) : null}
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        fontSize="$2"
                        color="$color11"
                      >
                        {place.address}
                      </Text>
                    </View>

                    <ArrowUpLeft marginLeft="$2" size={18} />
                  </View>
                  <Separator />
                </View>
              </Link>
            ))
          : null}
      </ScrollView>
    </View>
  );
}
