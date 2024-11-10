import config from "@/tamagui.config";
import { TamaguiProvider } from "tamagui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useThemeStore } from "@/stores/themeStore";

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const { currentTheme } = useThemeStore();

  if (!loaded) {
    return null;
  }

  const isDark = currentTheme.includes("dark");

  return (
    <SafeAreaProvider>
      <TamaguiProvider
        disableInjectCSS
        config={config}
        defaultTheme={currentTheme}
      >
        <StatusBar style={isDark ? "light" : "dark"} />
        <Slot />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
