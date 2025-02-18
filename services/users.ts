import { api } from "@/lib/api";
import { userSchema } from "@/models/User";

export const getUserById = async (userId: number) => {
  const res = await api.get(`/users/id/${userId}`);

  const { data } = res.data;

  return userSchema.parse({
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    email: data.email,
    verified: data.verified,
    reviewsCount: 0,
    followersCount: data.followers,
    followingCount: data.following,
    bookmarksCount: data.bookmarks,
    visitedCount: data.visited_places,
    createdAt: data.created_at.slice(0, 27),
    updatedAt: data.updated_at.slice(0, 27),
  });
};
