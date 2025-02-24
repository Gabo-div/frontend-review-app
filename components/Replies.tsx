import useCommentAnswers from "@/hooks/useCommentAnswers";
import Reply from "./Reply";
import { FlatList } from "react-native";
import { View } from "tamagui";

interface Props {
  commentId: number;
}

export default function Replies({ commentId }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentAnswers(commentId);

  const replies = data?.pages.map((page) => page.data).flat();

  return (
    <View paddingLeft="$9">
      <FlatList
        data={replies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Reply reply={item} />}
        contentContainerStyle={{
          gap: 28,
        }}
        onEndReached={() => {
          if (!hasNextPage || isLoading || isFetchingNextPage) return;
          fetchNextPage();
        }}
      />
    </View>
  );
}
