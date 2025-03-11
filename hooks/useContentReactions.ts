import { Reaction } from "@/models/Reaction";
import { getContentReactions } from "@/services/reactions";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  reactionType: Reaction["reactionType"];
  contentType: Reaction["contentType"];
  contentId: number;
}

export default function useContentReactions({
  reactionType,
  contentType,
  contentId,
}: Props) {
  return useInfiniteQuery({
    queryKey: ["comments", { reactionType, contentType, contentId }],
    queryFn: ({ pageParam }) =>
      getContentReactions({
        reactionType,
        contentType,
        contentId,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
