import { api } from "@/lib/api";
import { Reaction, reactionSchema } from "@/models/Reaction";
import { AxiosError } from "axios";

const routes: Record<Reaction["contentType"], string> = {
  review: "reviews",
  comment: "comments",
  answer: "answers",
};

const types: Record<Reaction["reactionType"], string> = {
  like: "likes",
  dislike: "dislikes",
};

const parseReactionType = (type: any): Reaction["reactionType"] => {
  if (!!type) {
    return "like";
  } else {
    return "dislike";
  }
};

export const getContentReactions = async ({
  reactionType,
  contentType,
  contentId,
  cursor,
}: {
  reactionType: Reaction["reactionType"];
  contentType: Reaction["contentType"];
  contentId: number;
  cursor?: number;
}) => {
  const res = await api.get(
    `/${routes[contentType]}/${contentId}/${types[reactionType]}/${cursor ? "?cursor=" + cursor : ""}`,
  );

  return {
    data: reactionSchema.array().parse(
      res.data.data.map((r: any) => ({
        ...r,
        userId: r.user_id,
        contentId: r.content_id,
        contentType: r.content_type,
        reactionType: parseReactionType(r.reaction_type),
        createdAt: r.created_at.slice(0, 27),
        updatedAt: r.updated_at.slice(0, 27),
      })),
    ),
    next: res.data.next_cursor || undefined,
  };
};

export const checkUserReaction = async ({
  contentType,
  contentId,
}: {
  contentType: Reaction["contentType"];
  contentId: number;
}) => {
  try {
    const res = await api(
      `/reactions/search?content_type=${contentType}&content_id=${contentId}`,
    );

    return {
      reaction: reactionSchema.shape.reactionType.parse(
        parseReactionType(res.data.reaction_type),
      ),
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 404) {
        return {
          reaction: null,
        };
      }
    }
  }
};
