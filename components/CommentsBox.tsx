import { useState } from "react";
import useCommentsBox from "@/hooks/useCommentsBox";
import { Button, XStack, TextArea, View, Text } from "tamagui";
import Comment from "./Comment";
import { Send, X } from "@tamagui/lucide-icons";
import useUser from "@/hooks/useUser";
import Avatar from "./Avatar";
import useReviewComments from "@/hooks/useReviewComments";
import { FlashList } from "@shopify/flash-list";

export default function CommentsBox() {
  const [sending, setSending] = useState(false);

  const { addComment, replyingTo, setReplyingTo, reviewId } = useCommentsBox();

  const { data: user } = useUser();
  const {
    data: comments,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useReviewComments(reviewId);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    setSending(true);

    await addComment(newComment);

    setSending(false);
    setNewComment("");
  };

  const commentsArray = comments?.pages.map((page) => page.data).flat();

  return (
    <>
      <FlashList
        data={commentsArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View paddingTop="$4">
            <Comment comment={item} />
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 28 }}
        estimatedItemSize={115}
        onEndReached={() => {
          if (!hasNextPage || isLoading || isFetchingNextPage) return;
          fetchNextPage();
        }}
      />
      {replyingTo ? (
        <View
          padding="$4"
          alignItems="center"
          backgroundColor="$color4"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text color="$color11">Respondiendo a {replyingTo.username}</Text>
          <X
            color="$color11"
            onPress={() => {
              setReplyingTo(null);
            }}
          />
        </View>
      ) : null}

      <XStack
        width="100%"
        gap="$3"
        alignItems="center"
        padding="$4"
        borderTopWidth={1}
        borderTopColor="$color6"
      >
        <Avatar src={user?.avatarUrl} />

        <TextArea
          flex={1}
          value={newComment}
          onChangeText={setNewComment}
          padding="$2.5"
          placeholder="Agrega un comentario..."
        />
        <Button onPress={handleAddComment} disabled={sending}>
          <Send size="$1" />
        </Button>
      </XStack>
    </>
  );
}
