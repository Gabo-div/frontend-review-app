import { Button, Text, View, XStack } from "tamagui";
import { Bell, MessageCircle } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
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
      <View flexDirection="row" gap="$2" alignItems="center">
        <Text fontSize="$8" color="$green11" fontWeight="bold">
          Leif
        </Text>
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
  );
}
