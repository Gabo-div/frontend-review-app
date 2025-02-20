import { Coordinate } from "@/models/Coordinate";
import { placeDetailsSchema } from "@/models/Place";
import { useAuthStore } from "@/stores/authStore";
import * as FileSystem from "expo-file-system";

export const sendImage = async (
  uri: string,
  { latitude, longitude }: Coordinate,
) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);

    if (!fileInfo.exists) {
      console.error("El archivo no existe en la ruta especificada");
      return [];
    }

    const response = await FileSystem.uploadAsync(
      `${process.env.API_URL}/inferences?lon=${latitude}&lat=${longitude}`,
      uri,
      {
        httpMethod: "POST",
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
      },
    );

    const data = JSON.parse(response.body);

    return placeDetailsSchema.omit({ category: true }).array().parse(data);
  } catch (error) {
    console.error("Error en SendImage:", error);
    return [];
  }
};
