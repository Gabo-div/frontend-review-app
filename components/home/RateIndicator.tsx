import { Star } from "@tamagui/lucide-icons";
import { Text, View, useTheme } from "tamagui";

interface Props {
  rate: number;
}

export default function RateIndicator({ rate }: Props) {
  const theme = useTheme();
  const stars = Math.round(rate);

  return (
    <View flexDirection="row" alignItems="center">
      <Text fontSize="$1" marginRight="$1">
        {rate}
      </Text>
      {Array.from({ length: stars }, (_, i) => (
        <Star key={i} fill={theme.green10.get()} strokeWidth={0} size={14} />
      ))}
    </View>
  );
}
