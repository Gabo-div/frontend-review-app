import React from "react";
import { XStack, Paragraph, Label, Image, Button, YStack } from "tamagui";
import { ThumbsUp, ThumbsDown } from "@tamagui/lucide-icons";

interface ReplyProps {
  user: string;
  comment: string;
  userAvatar: string;
  hours: number;
  likes: number;
  dislikes: number;
}

const Reply: React.FC<ReplyProps> = ({
  user,
  comment,
  userAvatar,
  hours,
  likes,
  dislikes,
}) => (
  <XStack
    marginTop="$2"
    marginLeft="$8"
    alignItems="flex-start"
    justifyContent="space-between"
  >
    <Image
      width={30}
      height={30}
      borderRadius={15}
      source={{ uri: userAvatar }}
      marginRight="$2"
    />
    <YStack width={180}>
      <Label>
        {user} {hours}
      </Label>
      <Paragraph>{comment}</Paragraph>
    </YStack>
    <YStack>
      <Button chromeless>
        <ThumbsUp size="$1" />
        <Label>{likes}</Label>
      </Button>
      <Button chromeless>
        <ThumbsDown size="$1" />
        <Label>{dislikes}</Label>
      </Button>
    </YStack>
  </XStack>
);

export default Reply;
