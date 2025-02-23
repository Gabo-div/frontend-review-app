import { api } from "@/lib/api";
import { reviewSchema } from "@/models/Review";

export const getFeed = async (cursor?: number) => {
  const res = await api.get(`/feed/${cursor ? "?cursor=" + cursor : ""}`);

  return {
    data: reviewSchema.array().parse(
      res.data.data.map((r: any) => ({
        ...r,
        placeId: r.place_id,
        userId: r.user_id,
        createdAt: r.created_at.slice(0, 27),
        updatedAt: r.updated_at.slice(0, 27),
      })),
    ),
    next: res.data.next_cursor,
  };
};
