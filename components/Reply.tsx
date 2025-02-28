import React from "react";
import { YStack, Paragraph, XStack, Text, View, Square } from "tamagui";
import { ThumbsUp, ThumbsDown } from "@tamagui/lucide-icons";
import { Reply as ReplyType } from "@/models/Comment";
import useUser from "@/hooks/useUser";
import Avatar from "./Avatar";
import useUserReaction from "@/hooks/useUserReaction";

interface Props {
  reply: ReplyType;
}

export default function Reply({ reply }: Props) {
  const { data: user } = useUser(reply.userId);

  const { data: reaction } = useUserReaction({
    contentType: "answer",
    contentId: reply.id,
  });

  return (
    <View
      padding="$4"
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
          {reply.text}
        </Paragraph>

        <View flexDirection="row" gap="$4" alignItems="center" marginTop="$2">
          <View alignItems="center" flexDirection="row" gap="$2">
            <ThumbsUp
              size={15}
              color={reaction?.reaction === "like" ? "$green10" : "$color11"}
            />
            <Text color="$color11">{reply.likesCount.toString()}</Text>
          </View>

          <View alignItems="center" flexDirection="row" gap="$2">
            <ThumbsDown
              size={15}
              color={reaction?.reaction === "dislike" ? "$red10" : "$color11"}
            />

            <Text color="$color11">{reply.dislikesCount.toString()}</Text>
          </View>
        </View>
      </YStack>
    </View>
  );
}
