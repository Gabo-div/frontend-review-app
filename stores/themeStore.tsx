import { ThemeName } from "tamagui";
import { create } from "zustand";

interface ThemeStore {
  currentTheme: ThemeName;
  setCurrentTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: "dark",
  setCurrentTheme: (theme: ThemeName) => set({ currentTheme: theme }),
}));
