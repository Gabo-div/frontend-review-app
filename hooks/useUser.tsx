import { getUserById } from "@/services/users";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export default function useUser(userId?: number) {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: ["user", userId || session?.user_id],
    queryFn: async () => {
      if (userId) {
        return getUserById(userId);
      }

      if (session?.user_id) {
        return getUserById(session.user_id);
      }

      return null;
    },
    enabled: !!userId || !!session?.user_id,
  });
}
