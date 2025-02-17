import { Link } from "expo-router";
import { Input, View } from "tamagui";

export default function SearchInput() {
  return (
    <Link href="/search" style={{ width: "100%" }}>
      <View width="100%" pointerEvents="none">
        <Input placeholder="Busca un lugar..." width="100%" />
      </View>
    </Link>
  );
}
