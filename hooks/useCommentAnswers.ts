import { getAnswersByCommentId } from "@/services/comments";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useCommentAnswers(commentId: number) {
  return useInfiniteQuery({
    queryKey: ["answers", { commentId }],
    queryFn: ({ pageParam }) => getAnswersByCommentId(commentId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
