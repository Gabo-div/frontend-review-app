import { Avatar as TAvatar, Circle } from "tamagui";
import { User } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Buffer } from "buffer";

interface Props {
  src?: string;
  size?: string;
}

export default function Avatar({ src, size = "$4" }: Props) {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!src) {
        return;
      }

      const res = await api.get(src, {
        responseType: "arraybuffer",
      });

      const base64 = Buffer.from(res.data, "binary").toString("base64");

      setSource(`data:image/png;base64,${base64}`);
    })();
  }, [src]);

  if (!source) {
    return <Circle size={size} backgroundColor="$color4" borderRadius="$9" />;
  }

  return (
    <TAvatar circular size={size}>
      <TAvatar.Image src={source} />
      <TAvatar.Fallback
        backgroundColor="$color4"
        alignItems="center"
        justifyContent="center"
      >
        <User size="$1" />
      </TAvatar.Fallback>
    </TAvatar>
  );
}
