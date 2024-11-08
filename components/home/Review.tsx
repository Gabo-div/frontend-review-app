import {
  Ellipsis,
  MessageCircle,
  Send,
  ThumbsDown,
  ThumbsUp,
  User,
} from "@tamagui/lucide-icons";
import { Avatar, Button, Text, View } from "tamagui";

export default function Review() {
  return (
    <View padding="$4" backgroundColor="$backgroundHover" borderRadius="$4">
      <View flexDirection="row" gap="$2" alignItems="center">
        <Avatar circular size="$3">
          <Avatar.Fallback
            backgroundColor="$color4"
            alignItems="center"
            justifyContent="center"
          >
            <User size="$1" />
          </Avatar.Fallback>
        </Avatar>
        <View>
          <Text fontSize="$2">Gabo</Text>
          <Text color="$gray10" fontSize="$2">
            _gabo
          </Text>
        </View>
        <Button chromeless marginLeft="auto">
          <Ellipsis size="$1" />
        </Button>
      </View>
      <View marginTop="$2">
        <Text color="$gray12" fontSize="$3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor. Cras elementum ultrices diam.
        </Text>
      </View>
      <View flexDirection="row" justifyContent="space-between" marginTop="$2">
        <Button chromeless>
          <ThumbsUp size="$1" />
        </Button>
        <Button chromeless>
          <ThumbsDown size="$1" />
        </Button>
        <Button chromeless>
          <MessageCircle size="$1" />
        </Button>
        <Button chromeless>
          <Send size="$1" />
        </Button>
      </View>
    </View>
  );
}
