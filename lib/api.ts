import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosError } from "axios";

const createApiInstace = () => {
  const instance = axios.create({
    baseURL: process.env.API_URL,
  });

  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error instanceof AxiosError && error.status === 401) {
        useAuthStore.getState().logout();
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const api = createApiInstace();
