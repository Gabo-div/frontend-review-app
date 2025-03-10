import { getUserVisited } from "@/services/visited";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useUserVisited(userId: number) {
  return useInfiniteQuery({
    queryKey: ["visited", { userId }],
    queryFn: ({ pageParam }) => getUserVisited(userId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
