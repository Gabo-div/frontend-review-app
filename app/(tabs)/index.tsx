import { View, ScrollView } from "tamagui";
import Review from "@/components/home/Review";

export default function Main() {
  return (
    <ScrollView>
      <View padding="$4" gap="$4">
        {Array.from({ length: 30 }).map((_, i) => (
          <Review key={i} />
        ))}
      </View>
    </ScrollView>
  );
}
