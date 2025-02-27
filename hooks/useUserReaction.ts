import { Reaction } from "@/models/Reaction";
import { checkUserReaction } from "@/services/reactions";
import { useQuery } from "@tanstack/react-query";

export default function useUserReaction(params: {
  contentType: Reaction["contentType"];
  contentId: Reaction["contentId"];
}) {
  return useQuery({
    queryKey: ["reaction", params],
    queryFn: async () => checkUserReaction(params),
  });
}
