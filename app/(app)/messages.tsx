import { User } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Avatar, ScrollView, Text, View } from "tamagui";

export default function Messages() {
  return (
    <ScrollView>
      <View padding="$4" gap="$4">
        {Array.from({ length: 30 }).map((_, i) => (
          <Link
            key={i}
            href={{
              pathname: "/chat",
              params: {
                userId: i,
              },
            }}
          >
            <View
              flexDirection="row"
              gap="$4"
              overflow="hidden"
              alignItems="center"
            >
              <Avatar size="$5">
                <Avatar.Fallback
                  backgroundColor="$color2"
                  borderRadius="$radius.9"
                  alignItems="center"
                  justifyContent="center"
                >
                  <User />
                </Avatar.Fallback>
              </Avatar>
              <View>
                <Text numberOfLines={1}>Chat {i + 1}</Text>
                <Text color="$color10" numberOfLines={1}>
                  Lorem ipsum
                </Text>
              </View>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
