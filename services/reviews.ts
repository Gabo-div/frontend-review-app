import { api } from "@/lib/api";
import { reviewSchema } from "@/models/Review";
import { useAuthStore } from "@/stores/authStore";

export const postReview = async ({
  placeId,
  text,
  rate,
  images,
}: {
  placeId: number;
  text: string;
  rate: number;
  images: string[];
}) => {
  try {
    const formData = new FormData();

    formData.append("place_id", placeId.toString());
    formData.append("text", text);
    formData.append("rate", (rate / 10).toString());

    images.forEach((image) => {
      const uri = image;
      const name = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(name as string);
      const type = match ? `image/${match[1]}` : `image`;

      // @ts-expect-error
      formData.append(`images`, {
        uri,
        type,
        name,
      });
    });

    const res = await fetch(`${process.env.API_URL}/reviews/`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    const data = await res.json();

    if (data.id) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getReviewsByPlaceId = async (
  placeId: number,
  options?: { page?: number; limit?: number },
) => {
  const page = options?.page || 1;
  const limit = options?.limit || 10;

  const res = await api.get(
    `/reviews/place/${placeId}?page=${page}&limit=${limit}`,
  );

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
    nextPage: res.data.pagination.has_next_page,
    page: res.data.pagination.page,
  };
};
