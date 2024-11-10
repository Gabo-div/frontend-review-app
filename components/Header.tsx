import { Button, GetRef, Text, View, XStack } from "tamagui";
import { Bell, MessageCircle } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDimensions from "@/hooks/useDimensions";

export default function Header() {
  const insets = useSafeAreaInsets();
  const { ref, onLayout, height } = useDimensions<GetRef<typeof View>>();

  return (
    <>
      <View
        ref={ref}
        onLayout={onLayout}
        position="absolute"
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
        <Text fontSize="$6" fontWeight="medium">
          Logo
        </Text>
        <XStack>
          <Button chromeless>
            <Bell size="$1" />
          </Button>
          <Button chromeless>
            <MessageCircle size="$1" />
          </Button>
        </XStack>
      </View>
      <View
        style={{
          paddingBottom: height || 82,
        }}
      ></View>
    </>
  );
}
