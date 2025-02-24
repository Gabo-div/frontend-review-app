import useCommentAnswers from "@/hooks/useCommentAnswers";
import Reply from "./Reply";
import { View } from "tamagui";
import { FlashList } from "@shopify/flash-list";

interface Props {
  commentId: number;
}

export default function Replies({ commentId }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentAnswers(commentId);

  const replies = data?.pages.map((page) => page.data).flat();

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
