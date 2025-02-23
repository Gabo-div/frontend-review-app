import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

export default function useImages(images: string[]) {
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    Promise.all(
      images.map(
        (src) =>
          new Promise<string>((resolve) => {
            api.get(src, { responseType: "arraybuffer" }).then((res) => {
              resolve(
                `data:image/png;base64,${Buffer.from(
                  res.data,
                  "binary",
                ).toString("base64")}`,
              );
            });
          }),
      ),
    ).then((imgs) => {
      setSources(imgs);
    });
  }, [images]);

  return { sources };
}
