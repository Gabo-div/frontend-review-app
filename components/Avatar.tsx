import { Circle, View } from "tamagui";
import { useAuthStore } from "@/stores/authStore";
import { Image } from "expo-image";

interface Props {
  src?: string;
  size?: string;
}

export default function Avatar({ src, size = "$4" }: Props) {
  const token = useAuthStore((state) => state.token);

  if (!src) {
    return <Circle size={size} backgroundColor="$color4" borderRadius="$9" />;
  }

  return (
    <View
      width={size}
      height={size}
      backgroundColor="$color4"
      overflow="hidden"
      borderRadius="100%"
    >
      <Image
        source={{
          uri: src,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
