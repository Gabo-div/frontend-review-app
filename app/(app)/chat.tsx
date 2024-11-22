import { useLocalSearchParams } from "expo-router";
import { Button, Input, ScrollView, Text, View } from "tamagui";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Send } from "@tamagui/lucide-icons";

const mockMessages: Message[] = [
  {
    incoming: false,
    content: "The obstacle is the way.",
  },
  {
    incoming: true,
    content: "Choose not to be harmed and you won't feel harmed.",
  },
  {
    incoming: false,
    content: "Difficulties strengthen the mind, as labor does the body.",
  },
  {
    incoming: true,
    content: "Everything we hear is an opinion, not a fact.",
  },

  {
    incoming: true,
    content: "Focus on what you can control.",
  },
  {
    incoming: false,
    content: "Be like a rock when facing difficulties.",
  },
  {
    incoming: true,
    content: "True happiness is to enjoy the present.",
  },
];

interface Message {
  incoming: boolean;
  content: string;
}

interface GroupedMessages {
  incoming: boolean;
  messages: string[];
}

export default function Chat() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessages[]>([]);

  useEffect(() => {
    if (userId) {
      return;
    }

    router.replace("/messages");
  }, [router, userId]);

  useEffect(() => {
    let grouped: GroupedMessages[] = [];
    let currentGroup: GroupedMessages | null = null;

    mockMessages.forEach((m) => {
      if (!currentGroup) {
        currentGroup = {
          incoming: m.incoming,
          messages: [m.content],
        };

        return;
      }

      if (currentGroup.incoming === m.incoming) {
        currentGroup.messages.push(m.content);
      } else {
        grouped.push(currentGroup);
        currentGroup = {
          incoming: m.incoming,
          messages: [m.content],
        };
      }
    });

    setGroupedMessages(grouped);
  }, []);

  return (
    <View flex={1}>
      <View flex={1}>
        <ScrollView>
          <View padding="$4" gap="$4">
            {groupedMessages.map((group, i) => {
              return (
                <View key={i} gap="$2">
                  {group.messages.map((message, i) => (
                    <View
                      key={i}
                      flexDirection={group.incoming ? "row" : "row-reverse"}
                      gap="$4"
                      alignItems="center"
                    >
                      <View
                        paddingHorizontal="$4"
                        paddingVertical="$2"
                        backgroundColor={group.incoming ? "$color2" : "$green4"}
                        borderRadius="$radius.6"
                      >
                        <Text>{message}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View
        paddingVertical="$3"
        paddingHorizontal="$2"
        borderTopWidth="$0.5"
        borderColor="$borderColor"
        flexDirection="row"
        gap="$2"
      >
        <Input
          placeholder="Escribe un mensaje..."
          borderRadius="$radius.9"
          flex={1}
        />
        <Button icon={<Send />} circular></Button>
      </View>
    </View>
  );
}
