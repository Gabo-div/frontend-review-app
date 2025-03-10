import { getReviewsByUserId } from "@/services/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useUserReviews(userId: number) {
  return useInfiniteQuery({
    queryKey: ["reviews", { userId }],
    queryFn: ({ pageParam }) =>
      getReviewsByUserId(userId, { page: pageParam, limit: 5 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.page + 1 : undefined,
  });
}
