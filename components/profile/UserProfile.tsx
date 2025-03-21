import { Bookmark, MapPinned, Rows3 } from "@tamagui/lucide-icons";
import {
  View,
  YStack,
  XStack,
  Text,
  styled,
  ScrollView,
  Spinner,
  Button,
  Tabs,
  Separator,
} from "tamagui";

import EditButton from "@/components/profile/EditButton";
import FollowButton from "@/components/profile/FollowButton";
import useUser from "@/hooks/useUser";
import UserReviews from "./UserReviews";
import Avatar from "../Avatar";
import UserBookmarks from "./UserBookmarks";
import UserVisited from "./UserVisited";
import FollowsSheet from "./FollowsSheet";
import { useState } from "react";

const TextNum = styled(Text, {
  marginTop: "$6",
  fontSize: "$6",
  marginHorizontal: "$2",
  color: "$color",
  fontWeight: "bold",
  textAlign: "center",
});

const TextCursiva = styled(Text, {
  fontSize: "$4",
  fontStyle: "italic",
});

interface Props {
  userId?: number;
}

export default function UserProfile({ userId }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: user, isLoading, isError, refetch } = useUser(userId);

  if (isLoading) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" color="$color" />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        gap="$4"
      >
        <Text textWrap="balance" textAlign="center" color="$red11">
          Ha ocurrido un error obteniendo la información del usuario.
        </Text>
        <Button onPress={() => refetch()}>Reintentar</Button>
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <View flex={1}>
          <View padding="$4">
            <YStack
              height="auto"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <XStack
                width="100%"
                alignContent="center"
                justifyContent="center"
                marginBottom="$2"
              >
                <Avatar src={user.avatarUrl} size="$10" />

                {/* Valores Numericos */}
                <TextNum marginLeft="$4" onPress={() => setIsSheetOpen(true)}>
                  {user.reviewsCount}
                  {"\n"}
                  <TextCursiva>Reseñas</TextCursiva>
                </TextNum>
                <TextNum onPress={() => setIsSheetOpen(true)}>
                  {user.followersCount} {"\n"}
                  <TextCursiva>Seguidores</TextCursiva>
                </TextNum>
                <TextNum>
                  {user.followingCount}
                  {"\n"}
                  <TextCursiva>Seguidos</TextCursiva>
                </TextNum>
              </XStack>

              <View flexDirection="row" alignItems="center" gap="$2">
                <Text
                  marginLeft="$2"
                  fontSize="$5"
                  fontWeight="bold"
                  color="$color"
                >
                  {user.username}
                </Text>

                {user.role === "admin" ? (
                  <Text
                    backgroundColor="$red4"
                    paddingHorizontal="$3"
                    paddingVertical="$1"
                    borderRadius="$4"
                    color="$color12"
                    fontSize="$1"
                  >
                    Administrador
                  </Text>
                ) : null}
              </View>

              <Text marginLeft="$2" fontSize="$4" color="$color">
                {user.description || "Sin descripción."}
              </Text>
            </YStack>

            <View justifyContent="center" marginTop="$4" width="100%">
              {!userId ? <EditButton /> : <FollowButton user={user} />}
            </View>
          </View>

          <Tabs
            marginTop="$4"
            defaultValue="tab1"
            orientation="horizontal"
            flexDirection="column"
            overflow="hidden"
            height="auto"
            flex={1}
          >
            <Tabs.List
              disablePassBorderRadius="bottom"
              aria-label="Manage your account"
              borderRadius="$0"
              borderColor="$borderColor"
            >
              <Tabs.Tab flex={1} value="tab1">
                <Rows3 size="$2" strokeWidth={1} />
              </Tabs.Tab>

              <Tabs.Tab flex={1} value="tab2">
                <MapPinned size="$2" strokeWidth={1} color={"$color"} />
              </Tabs.Tab>

              <Tabs.Tab
                flex={1}
                value="tab3"
                disabled={!!userId}
                disabledStyle={{ opacity: 0.5 }}
              >
                <Bookmark size="$2" strokeWidth={1} color={"$color"} />
              </Tabs.Tab>
            </Tabs.List>

            <Separator />

            <Tabs.Content value="tab1" flex={1}>
              <UserReviews userId={user.id} />
            </Tabs.Content>

            <Tabs.Content value="tab2" flex={1}>
              <UserVisited userId={user.id} />
            </Tabs.Content>

            <Tabs.Content value="tab3" flex={1}>
              <UserBookmarks />
            </Tabs.Content>
          </Tabs>
        </View>
      </ScrollView>
      <FollowsSheet
        userId={user.id}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
