import { getUserBookmarks } from "@/services/bookmarks";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useUserBookmarks() {
  return useInfiniteQuery({
    queryKey: ["bookmarks"],
    queryFn: ({ pageParam }) => getUserBookmarks(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
