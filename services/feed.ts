import { api } from "@/lib/api";
import { reviewSchema } from "@/models/Review";

export const getFeedByUserId = async (userId: number, cursor?: number) => {
  const res = await api.get(`/feed/${userId}${cursor ? "cursor="+cursor:""}`);

  const { data } = res.data;

  return {data:reviewSchema.array().parse(
    res.data.data.map((r:any) => ({
        ...r,
        placeId:r.place_id,
        userId:r.user_id,
        createdAt:r.created_at.slice(0,27),
        updatedAt:r.updated_at.slice(0,27),
    }))
  ),next:data.next_cursor};
};
