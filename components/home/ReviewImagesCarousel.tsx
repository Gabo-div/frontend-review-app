import { useRef, useState, useEffect } from "react";
import { Animated, FlatList } from "react-native";
import { Image, View, Circle } from "tamagui";
import { api } from "@/lib/api";
import { Buffer } from "buffer";

interface Props {
  images: string[];
}

export default function ReviewImagesCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [parsedImages, setParsedImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const imgs = await Promise.all(
        images.map((src) => api.get(src, { responseType: "arraybuffer" })),
      );

      const srcs = imgs.map(
        (res) =>
          `data:image/png;base64,${Buffer.from(res.data, "binary").toString(
            "base64",
          )}`,
      );

      setParsedImages(srcs);
    })();
  }, [images]);

  if (!images.length) {
    return null;
  }

  return (
    <View
      width="100%"
      aspectRatio={1 / 1}
      backgroundColor="$color4"
      position="relative"
    >
      <FlatList
        data={parsedImages}
        renderItem={({ item }) => (
          <View height="100%" aspectRatio={1 / 1}>
            <Image source={{ uri: item }} flex={1} />
          </View>
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )(event);
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (!viewableItems.length) {
            return;
          }

          setIndex(viewableItems[0].index || 0);
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      <View
        flexDirection="row"
        position="absolute"
        bottom="$4"
        left="50%"
        transform="translate(-50%, 0)"
        gap="$2"
      >
        {parsedImages.map((_image, i) => (
          <Circle
            key={i}
            size="$0.75"
            backgroundColor="white"
            opacity={index === i ? 1 : 0.5}
          />
        ))}
      </View>
    </View>
  );
}
