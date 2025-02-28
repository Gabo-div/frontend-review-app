import { Review } from "@/models/Review";
import {
  MapPin,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "@tamagui/lucide-icons";
import { Button, Circle, Square, Text, View } from "tamagui";
import CommentsSheet from "../CommentsSheet";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import usePlace from "@/hooks/usePlace";
import RateIndicator from "./RateIndicator";
import ReviewImagesCarousel from "./ReviewImagesCarousel";
import { Link } from "expo-router";
import Avatar from "@/components/Avatar";
import useUserReaction from "@/hooks/useUserReaction";

interface Props {
  data: Review;
  elevation?: number;
}

export default function ReviewCard({ data, elevation }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: user } = useUser(data.userId);
  const { data: place } = usePlace(data.placeId);
  const { data: reaction } = useUserReaction({
    contentType: "review",
    contentId: data.id,
  });

  return (
    <>
      <View borderRadius="$4" overflow="hidden">
        <ReviewImagesCarousel images={data.images} />
        <View
          padding="$4"
          backgroundColor={elevation ? `$color${elevation}` : "$color2"}
        >
          <View flexDirection="row" alignItems="center" marginBottom="$2">
            <View flexDirection="row" gap="$1" alignItems="center" flex={1}>
              <MapPin size={15} color="$green11" />
              <View flex={1}>
                {place ? (
                  <Link
                    asChild
                    href={{
                      pathname: "/place",
                      params: { mapsId: place.details.maps_id },
                    }}
                  >
                    <Text
                      color="$color11"
                      fontSize="$2"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {place.details.address}
                    </Text>
                  </Link>
                ) : (
                  <Square
                    height={10}
                    width="$6"
                    backgroundColor="$color4"
                    borderRadius="$radius.2"
                  />
                )}
              </View>
            </View>

            <View marginLeft="auto" paddingLeft="$2">
              <RateIndicator rate={data.rate} />
            </View>
          </View>

          <View flexDirection="row" gap="$2">
            {user ? (
              <>
                <Avatar size="$3" src={user?.avatarUrl} />
                <View>
                  <Text fontSize="$2">{user.displayName}</Text>
                  <Text color="$gray10" fontSize="$2">
                    {user.username}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Circle size="$3" backgroundColor="$color4" borderRadius="$9" />
                <View gap="$2">
                  <Square
                    height={10}
                    width="$8"
                    backgroundColor="$color4"
                    borderRadius="$radius.2"
                  />
                  <Square
                    height={10}
                    width="$6"
                    backgroundColor="$color4"
                    borderRadius="$radius.2"
                  />
                </View>
              </>
            )}
            <Text
              marginTop="$1"
              fontSize="$1"
              color="$color10"
              marginLeft="auto"
            >
              {data.createdAt.toLocaleDateString("es")}
            </Text>
          </View>

          <View marginTop="$2">
            <Text color="$gray12" fontSize="$3">
              {data.text}
            </Text>
          </View>

          <View
            flexDirection="row"
            justifyContent="space-between"
            marginTop="$2"
          >
            <Button
              chromeless
              icon={<ThumbsUp size="$1" />}
              padding="0"
              color={reaction?.reaction === "like" ? "$green10" : undefined}
            >
              {data.likes.toString()}
            </Button>
            <Button
              chromeless
              icon={<ThumbsDown size="$1" />}
              padding="0"
              color={reaction?.reaction === "dislike" ? "$red10" : undefined}
            >
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
      <CommentsSheet
        reviewId={data.id}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
