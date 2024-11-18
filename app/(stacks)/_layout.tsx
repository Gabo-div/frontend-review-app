import StackHeader from "@/components/StackHeader";
import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function StacksLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.background.get() },
        header: (props) => {
          return (
            <StackHeader
              title={props.options.title ?? props.route.name}
              goBack={() => props.navigation.goBack()}
            />
          );
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notificaciones",
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          title: "Mensajes",
        }}
      />
    </Stack>
  );
}
