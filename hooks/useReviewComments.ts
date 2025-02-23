import { getCommentsByReviewId } from "@/services/comments";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useReviewComments(reviewId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", { reviewId }],
    queryFn: ({ pageParam }) => getCommentsByReviewId(reviewId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
