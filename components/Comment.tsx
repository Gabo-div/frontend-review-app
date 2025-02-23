import React, { useState } from "react";
import { YStack, Paragraph, XStack, Text, View, Square } from "tamagui";
import { ThumbsUp, ThumbsDown } from "@tamagui/lucide-icons";
import { Comment as CommentType } from "@/models/Comment";
import useCommentsBox from "@/hooks/useCommentsBox";
import useUser from "@/hooks/useUser";
import Avatar from "./Avatar";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  const { data: user } = useUser(comment.userId);

  const { setReplyingTo } = useCommentsBox();

  const [showReplies, setShowReplies] = useState(false);

  return (
    <YStack>
      <View
        padding="$4"
        paddingBottom="0"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <View marginRight="$4">
          <Avatar src={user?.avatarUrl} size="$3" />
        </View>

        <YStack flex={1}>
          <XStack gap="$2" alignItems="center">
            {user ? (
              <Text>{user.username}</Text>
            ) : (
              <Square
                height={10}
                width="$8"
                backgroundColor="$color4"
                borderRadius="$radius.2"
              />
            )}
            <Text color="$color10">1h</Text>
          </XStack>

          <Paragraph fontSize="$3" lineHeight="$3" marginTop="$2">
            {comment.text}
          </Paragraph>

          <View flexDirection="row" gap="$4" alignItems="center" marginTop="$2">
            <View alignItems="center" flexDirection="row" gap="$2">
              <ThumbsUp size={15} color="$color11" />
              <Text color="$color11">{comment.likesCount}</Text>
            </View>

            <View alignItems="center" flexDirection="row" gap="$2">
              <ThumbsDown size={15} color="$color11" />
              <Text color="$color11">{comment.dislikesCount}</Text>
            </View>
            <Text
              color="$color11"
              onPress={() => {
                if (!user) return;

                setReplyingTo({
                  commentId: comment.id,
                  username: user.username,
                });
              }}
            >
              Responder
            </Text>
          </View>

          {comment.answersCount ? (
            <Text
              marginTop="$4"
              color="$gray10Light"
              textAlign="center"
              onPress={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? `Ocultar respuestas (${comment.answersCount})`
                : `Ver respuestas (${comment.answersCount})`}
            </Text>
          ) : null}
        </YStack>
      </View>
      {/* {showReplies && ( */}
      {/*   <YStack marginLeft="$8"> */}
      {/*     {replies.map((reply, index) => ( */}
      {/*       <Reply key={index} {...reply} /> */}
      {/*     ))} */}
      {/*   </YStack> */}
      {/* )} */}
    </YStack>
  );
};

export default Comment;
