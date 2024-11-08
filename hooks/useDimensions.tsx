import { useCallback, useRef, useState } from "react";
import { View } from "react-native";

export default function useDimensions<T>() {
  const [height, setHeight] = useState(0);
  const ref = useRef<T>(null);

  const onLayout = useCallback(() => {
    (ref.current as View).measureInWindow((_x, _y, _width, height) => {
      setHeight(height);
    });
  }, []);

  return { height, ref, onLayout };
}
