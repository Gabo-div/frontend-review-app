import { Button, Sheet, Text, View, XStack } from "tamagui";
import { Bell, ChevronDown, MessageCircle } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import useUser from "@/hooks/useUser";

export default function ProfileHeader() {
  const { data: user } = useUser();

  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const authStore = useAuthStore();

  return (
    <>
      <View
        flexDirection="row"
        top="$0"
        gap="$2"
        left="$0"
        width="100%"
        justifyContent="space-between"
        borderBottomColor="$borderColor"
        alignItems="center"
        borderBottomWidth="$0.5"
        paddingHorizontal="$4"
        zIndex={10}
        style={{ paddingTop: insets.top }}
        paddingBottom="$2"
        backgroundColor="$background"
      >
        <View
          flexDirection="row"
          gap="$2"
          alignItems="center"
          onPress={() => setIsOpen(true)}
        >
          <Text fontSize="$7">{user?.username || "usuario"}</Text>
          <ChevronDown size="$1.5" />
        </View>

        <XStack>
          <Link href="/notifications" asChild>
            <Button chromeless>
              <Bell size="$1" />
            </Button>
          </Link>
          <Link href="/messages" asChild>
            <Button chromeless>
              <MessageCircle size="$1" />
            </Button>
          </Link>
        </XStack>
      </View>
      <Sheet
        forceRemoveScrollEnabled
        open={isOpen}
        onOpenChange={setIsOpen}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="quick"
        snapPointsMode="fit"
        modal
      >
        <Sheet.Overlay />
        <Sheet.Handle backgroundColor="$color12" opacity={1} />
        <Sheet.Frame backgroundColor="$color2">
          <View padding="$4">
            <Button onPress={() => authStore.logout()}>Cerrar Sesión</Button>
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
