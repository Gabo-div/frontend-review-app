import { Button, View, Spinner, Text } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { Reaction } from "@/models/Reaction";
import ReactionUserCard from "./ReactionUserCard";

interface Props {
  dataArray: Reaction[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
}

export default function ReactionsSheetReactions({
  dataArray,
  isLoading,
  isError,
  hasNextPage,
  isFetchingNextPage,
  refetch,
  fetchNextPage,
}: Props) {
  if (isLoading) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" color="$color" />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        gap="$4"
      >
        <Text textWrap="balance" textAlign="center" color="$red11">
          Ha ocurrido un error.
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
          renderItem={({ item }) => (
            <View paddingTop="$4">
              <ReactionUserCard userId={item.userId} />
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
            No hay reacciones para mostrarte.
          </Text>
        </View>
      )}
    </>
  );
}
