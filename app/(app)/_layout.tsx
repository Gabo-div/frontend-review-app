import StackHeader from "@/components/StackHeader";
import useAuthRedirection from "@/hooks/useAuthRedirection";
import { Stack } from "expo-router";
import { Spinner, View, useTheme } from "tamagui";

export default function StacksLayout() {
  const theme = useTheme();

  const { isNavigationReady, user } = useAuthRedirection((user, redirect) => {
    if (!user) {
      redirect("/login");
    } else if (!user.verified) {
      redirect("/verify");
    }
  });

  if (!isNavigationReady || !user) {
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
      <Stack.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Buscar",
        }}
      />
      <Stack.Screen
        name="place"
        options={{
          title: "Lugar",
        }}
      />
      <Stack.Screen
        name="post"
        options={{
          title: "Publicar",
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          title: "Usuario",
        }}
      />
    </Stack>
  );
}
