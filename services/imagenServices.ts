import PlaceDetails from "@/components/PlaceDetails";
import { api } from "@/lib/api";
import { Coordinate } from "@/models/Coordinate";
import { placeDetailsSchema, placeSchema } from "@/models/Place";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import * as FileSystem from 'expo-file-system';


export const getImageURI = async (uri: string): Promise<Blob> => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Error al obtener la imagen"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};

const API_URL = "http://192.168.0.104:8080"; 

export const sendImage = async (uri: string, { latitude, longitude }: Coordinate) => {
  try {

    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("El archivo no existe en la ruta especificada");
      return []
    }

    const response = await FileSystem.uploadAsync(
      `${API_URL}/inferences?lon=${longitude}&lat=${latitude}`,
      uri,
      {
        httpMethod: "POST",
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
      }
    )
    const data = JSON.parse(response.body)
    return placeDetailsSchema.omit({ category: true }).array().parse(data)

  } catch (error) {
    console.error("Error en SendImage:", error);
    return []
  }
};