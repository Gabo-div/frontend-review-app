import { useThemeStore } from "@/stores/themeStore";
import { Circle, Theme, ThemeName, View } from "tamagui";

interface Props {
  theme: ThemeName;
}

export default function ThemePreview({ theme }: Props) {
  const { currentTheme, setCurrentTheme } = useThemeStore();

  const active = currentTheme === theme;

  return (
    <View
      width="25%"
      alignItems="center"
      justifyContent="center"
      borderRadius="$radius.4"
      padding="$2"
      backgroundColor={active ? "$color4" : "$background"}
      onPress={() => setCurrentTheme(theme)}
    >
      <Theme name={theme}>
        <Circle size="$6" overflow="hidden" flexWrap="wrap" bordered>
          <View backgroundColor="$background" height="50%" width="100%" />
          <View backgroundColor="$color6" height="50%" width="100%" />
        </Circle>
      </Theme>
    </View>
  );
}
