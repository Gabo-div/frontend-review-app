import useUser from "@/hooks/useUser";
import { Link } from "expo-router";
import { Circle, Square, Text, View } from "tamagui";
import Avatar from "../Avatar";

interface Props {
  userId: number;
}

export default function FollowUserCard({ userId }: Props) {
  const { data: user } = useUser(userId);

  return (
    <Link
      asChild
      href={{
        pathname: "/user",
        params: user ? { id: user.id } : {},
      }}
    >
      <View backgroundColor="$color4" padding="$4" borderRadius="$4">
        {user ? (
          <View flexDirection="row" gap="$2">
            <Avatar size="$3" src={user?.avatarUrl} />
            <View>
              <Text fontSize="$2">{user.displayName}</Text>
              <Text color="$gray10" fontSize="$2">
                {user.username}
              </Text>
            </View>
          </View>
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
      </View>
    </Link>
  );
}
