import { api } from "@/lib/api";
import { commentSchema } from "@/models/Comment";

export const getCommentsByReviewId = async (
  reviewId: number,
  cursor?: number,
) => {
  const res = await api.get(
    `/comments/review/${reviewId}${cursor ? "?cursor=" + cursor : ""}`,
  );

  return {
    data: commentSchema.array().parse(
      res.data.comments.map((d: any) => ({
        ...d,
        userId: d.user_id,
        reviewId: d.review_id,
        createdAt: d.created_at.slice(0, 27),
        updatedAt: d.updated_at.slice(0, 27),
        answersCount: d.answers,
        likesCount: d.likes,
        dislikesCount: d.dislikes,
      })),
    ),
    next: res.data.next_cursor || undefined,
  };
};

export const postComment = async ({
  reviewId,
  text,
}: {
  reviewId: number;
  text: string;
}) => {
  try {
    const res = await api.post("/comments", {
      review_id: reviewId,
      text,
    });

    if (res.data.id) {
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
