import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

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

  instance.interceptors.response.use((res) => {
    if (res.status === 401) {
      useAuthStore.setState({
        token: null,
        authenticated: false,
        session: null,
      });
    }

    return res;
  });

  return instance;
};

export const api = createApiInstace();
