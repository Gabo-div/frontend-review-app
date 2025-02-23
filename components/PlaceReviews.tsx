import usePlaceReviews from "@/hooks/usePlaceReviews";
import { Button, View, Spinner, Text } from "tamagui";
import ReviewCard from "./home/ReviewCard";

interface Props {
  placeId: number;
}

export default function PlaceReviews({ placeId }: Props) {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = usePlaceReviews(placeId);

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
    <View gap="$4" paddingHorizontal="$4">
      {data ? (
        <>
          {data.pages.map((page) =>
            page.data.map((review) => (
              <ReviewCard data={review} key={review.id} elevation={4} />
            )),
          )}
          {hasNextPage ? (
            <Button
              disabled={isFetchingNextPage}
              iconAfter={isFetchingNextPage ? <Spinner /> : null}
              onPress={() => fetchNextPage()}
            >
              Ver más
            </Button>
          ) : null}
        </>
      ) : null}
    </View>
  );
}
