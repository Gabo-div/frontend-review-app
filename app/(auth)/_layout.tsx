import useAuthRedirection from "@/hooks/useAuthRedirection";
import { Stack } from "expo-router";
import { Spinner, View, useTheme } from "tamagui";

export default function AuthLayout() {
  const { isReady, isAuthenticated } = useAuthRedirection(
    (isAuthenticated, redirect) => {
      if (isAuthenticated) {
        redirect("/");
      }
    },
  );

  const theme = useTheme();

  if (!isReady || isAuthenticated) {
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
