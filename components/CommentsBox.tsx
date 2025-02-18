import { useState } from "react";
import useCommentsBox from "@/hooks/useCommentsBox";
import {
  Button,
  XStack,
  TextArea,
  Image,
  ScrollView,
  View,
  Text,
} from "tamagui";
import Comment from "./Comment";
import { Send, X } from "@tamagui/lucide-icons";

export default function CommentsBox() {
  const { comments, addComment, replyingTo, setReplyingTo } = useCommentsBox();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment) {
      return;
    }
    addComment(newComment);
    setNewComment("");
  };

  return (
    <>
      <ScrollView>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </ScrollView>
      {replyingTo ? (
        <View
          padding="$4"
          alignItems="center"
          backgroundColor="$color4"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text color="$color11">Respondiendo a comentario {replyingTo}</Text>
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
        <Image
          width={40}
          height={40}
          borderRadius={20}
          src="https://imageplaceholder.net/600x400"
        />
        <TextArea
          flex={1}
          value={newComment}
          onChangeText={setNewComment}
          padding="$2.5"
          placeholder="Agrega un comentario..."
        />
        <Button onPress={handleAddComment}>
          <Send size="$1" />
        </Button>
      </XStack>
    </>
  );
}
