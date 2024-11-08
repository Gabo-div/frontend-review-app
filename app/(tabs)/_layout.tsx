import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { Compass, Focus, House, User } from "@tamagui/lucide-icons";
import Header from "@/components/Header";
import { useTheme } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      tabBar={(p) => <TabBar {...p} />}
      screenOptions={{
        header: () => <Header />,
      }}
      sceneContainerStyle={{
        backgroundColor: theme.background.get(),
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
          tabBarIcon: ({ size, color }) => (
            <Compass size={`${size}px`} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Reconocer",
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
    </Tabs>
  );
}
