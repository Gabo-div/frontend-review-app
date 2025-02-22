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
