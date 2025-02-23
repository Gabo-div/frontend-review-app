import { getReviewsByPlaceId } from "@/services/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePlaceReviews(placeId: number) {
  return useInfiniteQuery({
    queryKey: ["reviews", { placeId }],
    queryFn: ({ pageParam }) =>
      getReviewsByPlaceId(placeId, { page: pageParam, limit: 5 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.page + 1 : undefined,
  });
}
