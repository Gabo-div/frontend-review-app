import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, XStack } from "tamagui";

interface Props {
  icon: ReactNode;
  href?: string;
  text: string;
  trimURL?: boolean;
}

export default function PlaceDetailsContact({
  icon,
  href,
  text,
  trimURL,
}: Props) {
  const replaced = trimURL
    ? text
        .replace(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\//,
          "",
        )
        .replace("/", "")
    : text;

  if (href) {
    return (
      <Link href={href}>
        <XStack gap="$3" alignItems="center">
          {icon}
          <Text color="$color11" fontSize="$3" textBreakStrategy="balanced">
            {replaced}
          </Text>
        </XStack>
      </Link>
    );
  }

  return (
    <XStack gap="$3" alignItems="center">
      {icon}
      <Text color="$color11" fontSize="$3" textBreakStrategy="balanced">
        {replaced}
      </Text>
    </XStack>
  );
}
