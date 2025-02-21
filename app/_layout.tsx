import config from "@/tamagui.config";
import { TamaguiProvider } from "tamagui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useThemeStore } from "@/stores/themeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const { currentTheme } = useThemeStore();

  const [queryClient] = useState(() => new QueryClient());

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider
          disableInjectCSS
          config={config}
          defaultTheme={currentTheme}
        >
          <StatusBar style="light" />
          <Slot />
        </TamaguiProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
