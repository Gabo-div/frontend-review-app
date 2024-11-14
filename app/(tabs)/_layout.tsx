import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import {
  Compass,
  Focus,
  House,
  SlidersHorizontal,
  User,
} from "@tamagui/lucide-icons";
import Header from "@/components/Header";
import { useTheme } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      tabBar={(p) => <TabBar {...p} />}
      screenOptions={{
        header: () => <Header />,
        sceneStyle: { backgroundColor: theme.background.get() },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ size, color }) => (
            <House size={`${size}px`} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Compass size={`${size}px`} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Reconocer",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Focus size={`${size}px`} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ size, color }) => (
            <User size={`${size}px`} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: "Opciones",
          tabBarIcon: ({ size, color }) => (
            <SlidersHorizontal size={`${size}px`} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
