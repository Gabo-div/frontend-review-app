import { Text, View } from "tamagui";

interface Props {
  label: string;
  icon: React.ReactNode;
  isFocused: boolean;
  onPress: () => void;
}

export default function TabBarItem({ isFocused, icon, label, onPress }: Props) {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      onPress={onPress}
      backgroundColor="$background"
      paddingHorizontal="$3"
      paddingVertical="$1"
      borderRadius="$radius.9"
      animation="quick"
      forceStyle={isFocused ? "focus" : undefined}
      focusStyle={{
        backgroundColor: "$green3",
      }}
    >
      <View height="$3" justifyContent="center" alignItems="center">
        {icon}
      </View>
      {isFocused ? (
        <Text color="$green11" fontWeight="bold" paddingLeft="$2">
          {label}
        </Text>
      ) : null}
    </View>
  );
}
