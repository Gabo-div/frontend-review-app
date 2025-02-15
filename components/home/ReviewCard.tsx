import { Review } from "@/models/Review";
import {
  Ellipsis,
  MapPin,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  User,
} from "@tamagui/lucide-icons";
import { Avatar, Button, Image, Text, View } from "tamagui";
import CommentsSheet from "../CommentsSheet";
import { useState } from "react";

interface Props {
  data: Review;
  elevation?: number;
}

export default function ReviewCard({ data, elevation }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <View borderRadius="$4" overflow="hidden">
        {data.image ? (
          <View width="100%" aspectRatio={16 / 9}>
            <Image
              source={{
                uri: data.image,
                width: 200,
                height: 300,
              }}
              width="100%"
              height="100%"
            />
          </View>
        ) : null}

        <View
          padding="$4"
          backgroundColor={elevation ? `$color${elevation}` : "$color2"}
        >
          <View
            paddingBottom="$2"
            flexDirection="row"
            gap="$2"
            alignItems="center"
          >
            <MapPin size="$1" color="$green11" />
            <Text color="$color11">{data.place}</Text>
          </View>
          <View flexDirection="row" gap="$2" alignItems="center">
            <Avatar circular size="$3">
              <Avatar.Image accessibilityLabel="Cam" src={data.avatar} />
              <Avatar.Fallback
                backgroundColor="$color4"
                alignItems="center"
                justifyContent="center"
              >
                <User size="$1" />
              </Avatar.Fallback>
            </Avatar>
            <View>
              <Text fontSize="$2">{data.name}</Text>
              <Text color="$gray10" fontSize="$2">
                {data.username}
              </Text>
            </View>
            <Button chromeless marginLeft="auto" padding="0">
              <Ellipsis size="$1" />
            </Button>
          </View>
          <View marginTop="$2">
            <Text color="$gray12" fontSize="$3">
              {data.content}
            </Text>
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            marginTop="$2"
          >
            <Button chromeless icon={<ThumbsUp size="$1" />} padding="0">
              {data.likes.toString()}
            </Button>
            <Button chromeless icon={<ThumbsDown size="$1" />} padding="0">
              {data.dislikes.toString()}
            </Button>
            <Button
              chromeless
              icon={<MessageCircle size="$1" />}
              padding="0"
              onPress={() => setIsSheetOpen(true)}
            >
              {data.comments.toString()}
            </Button>
          </View>
        </View>
      </View>

      <CommentsSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
