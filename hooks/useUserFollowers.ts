import { getUsersFollowers } from "@/services/users";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useUserFollowers(userId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", { userId }],
    queryFn: ({ pageParam }) => getUsersFollowers(userId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
