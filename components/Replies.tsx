import useCommentAnswers from "@/hooks/useCommentAnswers";
import Reply from "./Reply";
import { Button, Spinner, Text, View } from "tamagui";
import { FlashList } from "@shopify/flash-list";

interface Props {
  commentId: number;
}

export default function Replies({ commentId }: Props) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
  } = useCommentAnswers(commentId);

  const replies = data?.pages.map((page) => page.data).flat();

  if (isLoading) {
    return (
      <View alignItems="center" justifyContent="center" paddingTop="$4">
        <Spinner color="$color" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$9"
        gap="$4"
      >
        <Text textWrap="balance" textAlign="center" color="$red11">
          Ha ocurrido un error obteniendo las respuestas.
        </Text>
        <Button onPress={() => refetch()}>Reintentar</Button>
      </View>
    );
  }

  return (
    <View paddingLeft="$9">
      <FlashList
        data={replies}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={122}
        renderItem={({ item }) => (
          <View paddingTop="$4">
            <Reply reply={item} />
          </View>
        )}
        onEndReached={() => {
          if (!hasNextPage || isLoading || isFetchingNextPage) return;
          fetchNextPage();
        }}
      />
    </View>
  );
}
