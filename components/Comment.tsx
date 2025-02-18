import React from "react";
import { YStack, Paragraph, XStack, Image, Text, View } from "tamagui";
import { ThumbsUp, ThumbsDown } from "@tamagui/lucide-icons";
import { Comment as CommentType } from "@/models/Comment";
import useCommentsBox from "@/hooks/useCommentsBox";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  const { setReplyingTo } = useCommentsBox();
  // const [showReplies, setShowReplies] = useState(false);
  // TODO: get user data
  // TODO: get replies

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
        <Image
          width={35}
          height={35}
          borderRadius="$radius.9"
          marginRight="$4"
          source={{ uri: "https://imageplaceholder.net/600x400" }}
        />

        <YStack flex={1}>
          <XStack gap="$2" alignItems="center">
            <Text>John Doe</Text>
            <Text color="$color10">1h</Text>
          </XStack>

          <Paragraph fontSize="$3" lineHeight="$3" marginTop="$2">
            {comment.content}
          </Paragraph>

          <View flexDirection="row" gap="$4" alignItems="center" marginTop="$2">
            <View alignItems="center" flexDirection="row" gap="$2">
              <ThumbsUp size={15} color="$color11" />
              <Text color="$color11">7</Text>
            </View>

            <View alignItems="center" flexDirection="row" gap="$2">
              <ThumbsDown size={15} color="$color11" />
              <Text color="$color11">7</Text>
            </View>
            <Text
              color="$color11"
              onPress={() => {
                setReplyingTo(comment.id);
              }}
            >
              Responder
            </Text>
          </View>

          {/* {replies.length ? ( */}
          {/*   <Text */}
          {/*     marginTop="$4" */}
          {/*     color="$gray10Light" */}
          {/*     textAlign="center" */}
          {/*     onPress={() => setShowReplies(!showReplies)} */}
          {/*   > */}
          {/*     {showReplies */}
          {/*       ? `Ocultar respuestas (${replies.length})` */}
          {/*       : `Ver respuestas (${replies.length})`} */}
          {/*   </Text> */}
          {/* ) : null} */}
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
