import { useAuthStore } from "@/stores/authStore";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";

type Callback = (
  isAuthenticated: boolean,
  redirect: (path: string) => void,
) => void;

export default function useAuthRedirection(callback: Callback) {
  const router = useRouter();
  const navigation = useNavigation();

  const [isNavigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setNavigationReady(true);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigation]);

  const isAuthenticated = useAuthStore((s) => s.authenticated);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    callback(isAuthenticated, (path: string) => router.replace(path));
  }, [isAuthenticated, router, isNavigationReady, callback]);

  return {
    isReady: isNavigationReady,
    isAuthenticated,
  };
}
