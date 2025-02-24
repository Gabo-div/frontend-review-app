import { getFeed } from "@/services/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewCard from "./ReviewCard";
import { Button, Spinner, View, Text } from "tamagui";
import { FlashList } from "@shopify/flash-list";

interface Props {
  header: () => React.ReactNode;
}

export default function Feed({ header }: Props) {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => getFeed(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const dataArray = data?.pages.map((page) => page.data).flat();

  if (isLoading) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" color="$color" />
      </View>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <>
      {dataArray?.length ? (
        <FlashList
          data={dataArray}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          estimatedItemSize={526}
          ListHeaderComponent={header}
          renderItem={({ item }) => (
            <View paddingTop="$4">
              <ReviewCard data={item} />
            </View>
          )}
          onEndReached={() => {
            if (!hasNextPage || isLoading || isFetchingNextPage) return;
            fetchNextPage();
          }}
        />
      ) : (
        <View paddingVertical="$6" alignItems="center">
          <Text textAlign="center" fontSize="$3" color="$color10" width="$20">
            No hay reseñas para mostrarte. Comienza siguiendo a otros usuarios.
          </Text>
        </View>
      )}
    </>
  );
}
