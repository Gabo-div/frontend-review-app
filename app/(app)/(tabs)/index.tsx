import { View, Button, Input } from "tamagui";
import useUser from "@/hooks/useUser";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";
import { Pencil } from "@tamagui/lucide-icons";
import Feed from "@/components/home/Feed";

export default function Main() {
  const { data: user } = useUser();

  return (
    <View flex={1} position="relative">
      <Feed
        header={() => (
          <View
            flexDirection="row"
            gap="$4"
            alignItems="center"
            paddingVertical="$2"
          >
            <Avatar src={user?.avatarUrl} />

            <Link href="/post" style={{ flex: 1, display: "flex" }}>
              <View width="100%" pointerEvents="none">
                <Input
                  width="100%"
                  placeholder="¿En qué estás pensando?"
                  borderRadius="$9"
                />
              </View>
            </Link>
          </View>
        )}
      />

      <Link href="/post" asChild>
        <Button
          theme="green"
          circular
          position="absolute"
          bottom="$2"
          right="$2"
          size="$6"
          icon={Pencil}
        />
      </Link>
    </View>
  );
}
