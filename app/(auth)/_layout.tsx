import useAuthRedirection from "@/hooks/useAuthRedirection";
import { Stack } from "expo-router";
import { Spinner, View, useTheme } from "tamagui";

export default function AuthLayout() {
  const { isNavigationReady } = useAuthRedirection((user, redirect) => {
    if (user && user.verified) {
      redirect("/");
    } else if (user && !user.verified) {
      redirect("/verify");
    }
  });

  const theme = useTheme();

  if (!isNavigationReady) {
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
        headerShown: false,
        contentStyle: { backgroundColor: theme.background.get() },
      }}
    ></Stack>
  );
}
