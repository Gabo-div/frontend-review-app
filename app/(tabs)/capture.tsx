import { Text, View } from "tamagui";
import { ScreenCamera }  from "@/components/ScreenCamera";

export default function Capture() {
  return (
    <View
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <ScreenCamera />

    </View>
  );
}