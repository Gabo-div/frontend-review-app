import { useAuthStore } from "@/stores/authStore";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Animated, FlatList } from "react-native";
import { View, Circle } from "tamagui";

interface Props {
  images: string[];
}

export default function ReviewImagesCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const token = useAuthStore((state) => state.token);

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
        data={images}
        renderItem={({ item }) => (
          <View height="100%" aspectRatio={1 / 1}>
            <Image
              source={{
                uri: item,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }}
              style={{ flex: 1 }}
            />
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
        {images.map((_image, i) => (
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
