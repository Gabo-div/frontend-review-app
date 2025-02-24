import { Avatar as TAvatar, Circle } from "tamagui";
import { User } from "@tamagui/lucide-icons";
import { useAuthStore } from "@/stores/authStore";

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
    <TAvatar circular size={size}>
      <TAvatar.Image
        source={{
          uri: src,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
      />
      <TAvatar.Fallback
        backgroundColor="$color4"
        alignItems="center"
        justifyContent="center"
      >
        <User size="$1" />
      </TAvatar.Fallback>
    </TAvatar>
  );
}
