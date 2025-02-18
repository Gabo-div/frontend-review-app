import { create } from "zustand";
import { z } from "zod";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface AuthStore {
  token: string | null;
  authenticated: boolean;
  session: {
    user_id: number;
    username: string;
  } | null;
  isLoading: boolean;
  login: (loginData: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      authenticated: false,
      session: null,
      isLoading: false,
      login: async ({ username, password }) => {
        set((state) => ({
          ...state,
          isLoading: true,
        }));

        let success = true;

        try {
          const data = await axios.post(`${process.env.API_URL}/auth/login`, {
            username,
            password,
          });

          const result = z
            .object({
              token: z.string(),
            })
            .parse(data.data);

          const decoded = jwtDecode(result.token);

          const parsedToken = z
            .object({
              user_id: z.number(),
              username: z.string(),
            })
            .parse(decoded);

          set({
            token: result.token,
            authenticated: true,
            session: parsedToken,
          });
        } catch (error) {
          console.log("login error", error);

          set({
            token: null,
            authenticated: false,
            session: null,
          });

          success = false;
        }

        set((state) => ({
          ...state,
          isLoading: false,
        }));

        return success;
      },
      logout: () => {
        set({
          token: null,
          authenticated: false,
          session: null,
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => {
        return {
          getItem: SecureStore.getItem,
          setItem: SecureStore.setItem,
          removeItem: (name: string) => SecureStore.deleteItemAsync(name),
        } satisfies StateStorage;
      }),
    },
  ),
);
