import React, { useState } from "react";
import {
  YStack,
  Paragraph,
  Label,
  XStack,
  Image,
  Button,
  TextArea,
} from "tamagui";
import { ThumbsUp, ThumbsDown, Send } from "@tamagui/lucide-icons";
import Reply from "./Reply";

interface CommentProps {
  user: string;
  comment: string;
  userAvatar: string;
  hours: number;
  replies: any[];
  likes: number;
  dislikes: number;
}

const Comment: React.FC<CommentProps> = ({
  user,
  comment,
  userAvatar,
  hours,
  replies,
  likes,
  dislikes,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");

  const handleAddReply = () => {
    if (newReply) {
      replies.push({
        user: "You",
        comment: newReply,
        userAvatar: "https://imageplaceholder.net/600x400",
        hours: 0,
        likes: 0,
        dislikes: 0,
      });
      setNewReply("");
    }
  };

  return (
    <YStack>
      <XStack
        marginLeft="$4"
        marginTop="$4"
        marginBottom="$4"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Image
          width={40}
          height={40}
          borderRadius={20}
          source={{ uri: userAvatar }}
          marginTop="$4"
        />
        <YStack width={180}>
          <Label>
            {user} {hours}
          </Label>
          <Paragraph>{comment}</Paragraph>
          <Label
            color={"$gray10Light"}
            onPress={() => setShowReplies(!showReplies)}
          >
            {showReplies
              ? `Ocultar respuestas (${replies.length})`
              : `Responder (${replies.length})`}
          </Label>
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
      {showReplies && (
        <YStack marginLeft="$4">
          {replies.map((reply, index) => (
            <Reply key={index} {...reply} />
          ))}
          <XStack
            width="100%"
            gap="$4"
            marginTop="$4"
            marginBottom="$4"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              width={30}
              height={30}
              borderRadius={15}
              source={{ uri: "https://imageplaceholder.net/600x400" }}
            />
            <TextArea
              padding="$2"
              borderWidth={2}
              value={newReply}
              onChangeText={setNewReply}
              placeholder="Agrega una respuesta..."
            />
            <Button onPress={handleAddReply}>
              <Send size="$1" />
            </Button>
          </XStack>
        </YStack>
      )}
    </YStack>
  );
};

export default Comment;
