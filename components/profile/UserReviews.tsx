import useUserReviews from "@/hooks/useUserReviews";
import { Button, View, Spinner, Text } from "tamagui";
import ReviewCard from "@/components/home/ReviewCard";
import { FlashList } from "@shopify/flash-list";

interface Props {
  userId: number;
}

export default function UserReviews({ userId }: Props) {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = useUserReviews(userId);

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
          Ha ocurrido un error obteniendo las reseñas del usuario.
        </Text>
        <Button onPress={() => refetch()}>Reintentar</Button>
      </View>
    );
  }

  const dataArray = data?.pages.map((page) => page.data).flat();

  return (
    <>
      {dataArray?.length ? (
        <FlashList
          data={dataArray}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          estimatedItemSize={526}
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
            No hay reseñas para mostrarte.
          </Text>
        </View>
      )}
    </>
  );
}
