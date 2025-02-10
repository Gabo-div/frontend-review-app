import { Send } from "@tamagui/lucide-icons";
import { Sheet } from "@tamagui/sheet";
import React, { useState } from "react";
import { Button, XStack, TextArea, Image, ScrollView } from "tamagui";
import Comment from "./Comment";

interface SheetDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommentsSheet = ({ open, onOpenChange }: SheetDemoProps) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  const handleAddComment = () => {
    if (newComment) {
      setComments([
        ...comments,
        {
          user: "You",
          comment: newComment,
          userAvatar: "https://imageplaceholder.net/600x400",
          hours: 3,
          replies: [],
          likes: 600,
          dislikes: 600,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={!!open}
        open={open}
        onOpenChange={onOpenChange}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="quick"
        snapPoints={[95]}
        modal
      >
        <Sheet.Overlay />
        <Sheet.Handle backgroundColor="$color12" opacity={1} />
        <Sheet.Frame
          backgroundColor="$color2"
          borderTopLeftRadius="$radius.9"
          borderTopRightRadius="$radius.9"
        >
          <ScrollView>
            {comments.map((comment, index) => (
              <Comment key={index} {...comment} />
            ))}
          </ScrollView>
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
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default CommentsSheet;
