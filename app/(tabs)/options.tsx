import ThemePreview from "@/components/options/ThemePreview";
import { config } from "@tamagui/config/v3";
import { useEffect, useState } from "react";
import { ScrollView, Text, ThemeName, View } from "tamagui";

const colors = new Set([
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "red",
]);

interface ThemeGroup {
  dark: ThemeName[];
  light: ThemeName[];
}

export default function Options() {
  const [themes, setThemes] = useState<ThemeGroup>({ dark: [], light: [] });

  useEffect(() => {
    const configThemes = Object.keys(config.themes) as ThemeName[];
    const groupedThemes: ThemeGroup = { dark: [], light: [] };

    configThemes.forEach((theme) => {
      const words = theme.split("_");
      const [mode, name] = words;

      if (words.length > 2) {
        return;
      }

      if (name && !colors.has(name)) {
        return;
      }

      if (mode === "dark") {
        groupedThemes.dark.push(theme);
      } else if (mode === "light") {
        groupedThemes.light.push(theme);
      }
    });

    setThemes(groupedThemes);
  }, []);

  return (
    <ScrollView>
      <View padding="$4" gap="$4" backgroundColor="$background">
        <Text>Selecciona un tema</Text>
        <View flexDirection="row" flexWrap="wrap">
          {themes.light.map((theme) => (
            <ThemePreview key={theme} theme={theme} />
          ))}
          {themes.dark.map((theme) => (
            <ThemePreview key={theme} theme={theme} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
