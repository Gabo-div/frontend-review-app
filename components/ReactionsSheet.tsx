import useContentReactions from "@/hooks/useContentReactions";
import { Reaction } from "@/models/Reaction";
import { Separator, Sheet, SizableText, Tabs, Text } from "tamagui";
import ReactionsSheetReactions from "./ReactionsSheetReactions";
import { useEffect, useState } from "react";
import { useRouteInfo } from "expo-router/build/hooks";

interface Props {
  contentType: Reaction["contentType"];
  contentId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function ReactionsSheet({
  contentType,
  contentId,
  open,
  onOpenChange,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <ReactionsSheetContent
      contentType={contentType}
      contentId={contentId}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}

function ReactionsSheetContent({
  contentType,
  contentId,
  open,
  onOpenChange,
}: Props) {
  const {
    data: likesData,
    isLoading: likesIsLoading,
    isError: likesIsError,
    hasNextPage: likesHasNextPage,
    isFetchingNextPage: likesIsFetchingNextPage,
    refetch: likesRefetch,
    fetchNextPage: likesFetchNextPage,
  } = useContentReactions({
    contentType,
    contentId,
    reactionType: "like",
  });

  const {
    data: dislikesData,
    isLoading: dislikesIsLoading,
    isError: dislikesIsError,
    hasNextPage: dislikesHasNextPage,
    isFetchingNextPage: dislikesIsFetchingNextPage,
    refetch: dislikesRefetch,
    fetchNextPage: dislikesFetchNextPage,
  } = useContentReactions({
    contentType,
    contentId,
    reactionType: "dislike",
  });

  const navigation = useRouteInfo();
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      setPathname(navigation.pathname);
      return;
    }

    if (pathname !== navigation.pathname) {
      onOpenChange(false);
    }
  }, [navigation, pathname, onOpenChange]);

  return (
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
        <Text textAlign="center" marginBottom="$4" marginTop="$6">
          Reacciones
        </Text>
        <Separator />
        <Tabs
          defaultValue="tab1"
          orientation="horizontal"
          flexDirection="column"
          overflow="hidden"
          borderColor="$borderColor"
          flex={1}
        >
          <Tabs.List
            disablePassBorderRadius="bottom"
            aria-label="Manage your account"
            padding="$4"
            gap="$4"
          >
            <Tabs.Tab flex={1} value="tab1" borderRadius="$2">
              <SizableText fontFamily="$body">Likes</SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="tab2" borderRadius="$2">
              <SizableText fontFamily="$body">Dislikes</SizableText>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Content value="tab1" flex={1}>
            <ReactionsSheetReactions
              dataArray={
                likesData
                  ? likesData?.pages.map((page) => page.data).flat()
                  : []
              }
              isLoading={likesIsLoading}
              isError={likesIsError}
              hasNextPage={likesHasNextPage}
              isFetchingNextPage={likesIsFetchingNextPage}
              refetch={likesRefetch}
              fetchNextPage={likesFetchNextPage}
            />
          </Tabs.Content>
          <Tabs.Content value="tab2" flex={1}>
            <ReactionsSheetReactions
              dataArray={
                dislikesData
                  ? dislikesData?.pages.map((page) => page.data).flat()
                  : []
              }
              isLoading={dislikesIsLoading}
              isError={dislikesIsError}
              hasNextPage={dislikesHasNextPage}
              isFetchingNextPage={dislikesIsFetchingNextPage}
              refetch={dislikesRefetch}
              fetchNextPage={dislikesFetchNextPage}
            />
          </Tabs.Content>
        </Tabs>
      </Sheet.Frame>
    </Sheet>
  );
}
