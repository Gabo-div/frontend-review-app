import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { User } from "@/models/User";
import { useRouteInfo } from "expo-router/build/hooks";

type Callback = (data: User | null, redirect: (path: string) => void) => void;

export default function useAuthRedirection(callback: Callback) {
  const router = useRouter();
  const navigation = useNavigation();
  const route = useRouteInfo();

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

  const { data: user, status } = useUser();

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (status === "pending") {
      return;
    }

    if (status === "error") {
      callback(null, (path: string) => {
        if (route.pathname === path) {
          return;
        }
        router.replace(path);
      });
    }

    if (status === "success") {
      callback(user, (path: string) => {
        if (route.pathname === path) {
          return;
        }
        router.replace(path);
      });
    }
  }, [user, status, router, isNavigationReady, callback, route]);

  return {
    isNavigationReady,
    user,
  };
}
