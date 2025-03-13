import { Review } from "@/models/Review";
import {
  MapPin,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  Wrench,
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
import ReactionsSheet from "../ReactionsSheet";
import AdminReviewSheet from "../AdminReviewSheet";
import { postReaction } from "@/services/reactions";
import { useToastController } from "@tamagui/toast";

interface Props {
  data: Review;
  elevation?: number;
}

export default function ReviewCard({ data, elevation }: Props) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isReactionsOpen, setIsReactionsOpen] = useState(false);

  const { data: currentUser } = useUser();
  const { data: user } = useUser(data.userId);
  const { data: place } = usePlace(data.placeId);
  const { data: reaction } = useUserReaction({
    contentType: "review",
    contentId: data.id,
  });
  const toast = useToastController();

  const onLike = async () => {
    const res = await postReaction({
      contentType: "review",
      contentId: data.id,
      reactionType: "like",
    });
    if (res) {
      toast.show("like", {
        message: "like saved successfully",
        native: true,
      });
    } else {
      toast.show("Ha ocurrido un error", {
        message: "No hemos podido guardar el like",
        native: true,
        type: "error",
      });
    }
  };

  const onDislike = async () => {
    const res = await postReaction({
      contentType: "review",
      contentId: data.id,
      reactionType: "dislike",
    });
    if (res) {
      toast.show("dislike", {
        message: "dislike saved successfully",
        native: true,
      });
    } else {
      toast.show("Ha ocurrido un error", {
        message: "No hemos podido guardar el dislike",
        native: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <View borderRadius="$4" overflow="hidden" position="relative">
        {currentUser && currentUser.role === "admin" ? (
          <Button
            circular
            position="absolute"
            icon={Wrench}
            top="$2"
            right="$2"
            zIndex={1000}
            onPress={() => setIsAdminOpen(true)}
          />
        ) : null}

        {data.images ? <ReviewImagesCarousel images={data.images} /> : null}
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

          <View flexDirection="row">
            {user ? (
              <Link
                asChild
                href={{
                  pathname: "/user",
                  params: { id: user.id },
                }}
              >
                <View flexDirection="row" gap="$2">
                  <Avatar size="$3" src={user?.avatarUrl} />
                  <View>
                    <Text fontSize="$2">{user.displayName}</Text>
                    <Text color="$gray10" fontSize="$2">
                      {user.username}
                    </Text>
                  </View>
                </View>
              </Link>
            ) : (
              <View flexDirection="row" gap="$2">
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
              </View>
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
              onLongPress={() => setIsReactionsOpen(true)}
              onPress={onLike}
            >
              {data.likes.toString()}
            </Button>
            <Button
              chromeless
              icon={<ThumbsDown size="$1" />}
              padding="0"
              color={reaction?.reaction === "dislike" ? "$red10" : undefined}
              onLongPress={() => setIsReactionsOpen(true)}
              onPress={onDislike}
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
      <ReactionsSheet
        contentType="review"
        contentId={data.id}
        open={isReactionsOpen}
        onOpenChange={setIsReactionsOpen}
      />
      <AdminReviewSheet
        reviewId={data.id}
        open={isAdminOpen}
        onOpenChange={setIsAdminOpen}
      />
    </>
  );
}
