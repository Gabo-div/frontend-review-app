import { getUsersFollowings } from "@/services/users";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useUserFollowings(userId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", { userId }],
    queryFn: ({ pageParam }) => getUsersFollowings(userId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
