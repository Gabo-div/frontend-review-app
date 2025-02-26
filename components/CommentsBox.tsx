import { useState } from "react";
import useCommentsBox from "@/hooks/useCommentsBox";
import { Button, XStack, TextArea, View, Text, Spinner } from "tamagui";
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
    error,
    refetch,
  } = useReviewComments(reviewId);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    setSending(true);

    await addComment(newComment);

    setSending(false);
    setNewComment("");
  };

  const commentsArray = comments?.pages.map((page) => page.data).flat();

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
      {commentsArray?.length ? (
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
      ) : (
        <View flex={1} alignItems="center" justifyContent="center">
          <Text textAlign="center" fontSize="$3" color="$color10" width="$20">
            Se el primero en comentar
          </Text>
        </View>
      )}

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
