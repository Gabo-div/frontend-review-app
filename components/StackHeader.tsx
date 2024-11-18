import { Button, Text, View } from "tamagui";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  goBack: () => void;
}

export default function StackHeader({ title, goBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      flexDirection="row"
      gap="$2"
      borderBottomColor="$borderColor"
      alignItems="center"
      borderBottomWidth="$0.5"
      paddingHorizontal="$4"
      style={{ paddingTop: insets.top }}
      paddingBottom="$2"
      backgroundColor="$background"
    >
      <Button
        chromeless
        circular
        icon={<ArrowLeft size="$1.5" />}
        onPress={goBack}
      />

      <Text fontSize="$6">{title}</Text>
    </View>
  );
}
