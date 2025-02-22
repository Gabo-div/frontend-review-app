import { getPlacesByQuery } from "@/services/places";
import { MapPin, X } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Button, Input, Separator, Spinner, Text, View } from "tamagui";

type Option = { maps_id: string; address: string; name: string | null };

interface Props {
  onPlaceSelect?: (place: Option | null) => void;
}

export default function PlaceSelector({ onPlaceSelect }: Props) {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");

  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selected, setSelected] = useState<Option | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    (async () => {
      if (!query) {
        setIsLoading(false);
        setError(false);
        setOpen(false);
        setResults([]);
        return;
      }
      try {
        setOpen(true);
        setIsLoading(true);

        const places = await getPlacesByQuery(query);
        setResults(places);
      } catch (error) {
        console.log(error);
        setError(true);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]);

  const onSelect = (options: Option) => {
    setSelected(options);
    setOpen(false);
    setResults([]);
    setQuery("");
    setValue("");

    if (onPlaceSelect) {
      onPlaceSelect(options);
    }
  };

  if (selected) {
    return (
      <View
        flexDirection="row"
        alignItems="center"
        gap="$2"
        backgroundColor="$color2"
        padding="$2"
        paddingLeft="$3"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <MapPin size="$1" color="$green10" />

        <View flex={1}>
          <Text
            numberOfLines={1}
            fontSize="$3"
            ellipsizeMode="tail"
            color="$color11"
          >
            {selected.address}
          </Text>
        </View>

        <Button
          size="$2"
          circular
          icon={X}
          onPress={() => {
            setSelected(null);
            if (onPlaceSelect) {
              onPlaceSelect(null);
            }
          }}
        />
      </View>
    );
  }

  return (
    <View position="relative">
      <Input
        placeholder="Escribe tu ubicación"
        value={value}
        readOnly={!!selected}
        onChangeText={setValue}
        borderBottomRightRadius={open ? 0 : "$4"}
        borderBottomLeftRadius={open ? 0 : "$4"}
        onFocus={() => {
          if (results.length) {
            setOpen(true);
          }
        }}
      />
      <View
        display={open ? "flex" : "none"}
        position="absolute"
        backgroundColor="$color4"
        width="100%"
        top="100%"
        zIndex={1000}
        borderBottomRightRadius="$4"
        borderBottomLeftRadius="$4"
        paddingHorizontal="$4"
      >
        {error ? (
          <View paddingVertical="$4">
            <Text color="$color11" textAlign="center">
              Ocurrió un error
            </Text>
          </View>
        ) : null}
        {isLoading ? (
          <View paddingVertical="$4">
            <Spinner color="$color" />
          </View>
        ) : null}

        {query && !isLoading && !error && !results.length ? (
          <Text fontSize="$2" paddingVertical="$3" color="$color11">
            No se encontraron resultados
          </Text>
        ) : null}

        {!isLoading &&
          results.map((place, i) => (
            <View width="100%" key={place.maps_id + i}>
              <View
                flexDirection="row"
                paddingVertical="$3"
                alignItems="center"
                onPress={() => onSelect(place)}
              >
                <View flex={1}>
                  {place.name ? (
                    <Text numberOfLines={1} ellipsizeMode="tail" fontSize="$2">
                      {place.name}
                    </Text>
                  ) : null}

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    fontSize="$1"
                    color="$color11"
                  >
                    {place.address}
                  </Text>
                </View>
              </View>
              {i < results.length - 1 ? (
                <Separator borderColor="$color8" />
              ) : null}
            </View>
          ))}
      </View>
    </View>
  );
}
