import StackHeader from "@/components/StackHeader";
import useAuthRedirection from "@/hooks/useAuthRedirection";
import { Stack } from "expo-router";
import { Spinner, View, useTheme } from "tamagui";

export default function StacksLayout() {
  const theme = useTheme();

  const { isReady, isAuthenticated } = useAuthRedirection(
    (isAuthenticated, redirect) => {
      if (!isAuthenticated) {
        redirect("/login");
      }
    },
  );

  if (!isReady || !isAuthenticated) {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
      >
        <Spinner size="large" color="$color" />
      </View>
    );
  }

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
