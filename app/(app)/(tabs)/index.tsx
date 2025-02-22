import { View, ScrollView, Input } from "tamagui";
import ReviewCard from "@/components/home/ReviewCard";
import { Review } from "@/models/Review";
import { Button } from "tamagui";
import { Pencil } from "@tamagui/lucide-icons";
import useUser from "@/hooks/useUser";
import Avatar from "@/components/Avatar";
import { Link } from "expo-router";

const reviews: Review[] = [
  {
    id: 1,
    placeId: 1,
    userId: 1,
    rate: 3.5,
    images: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    text: "El servicio es otro nivel. Los meseros son súper amables y atentos. Te hacen sentir como en casa desde el momento en que entras por la puerta.",
    likes: 20,
    dislikes: 10,
    comments: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    placeId: 1,
    userId: 3,
    rate: 5,
    images: [],
    text: "El parque es un verdadero refugio para los amantes de la naturaleza. Con senderos bien cuidados que serpentean a través de densos bosques y prados abiertos, es el lugar ideal para una caminata relajante.",
    likes: 20,
    dislikes: 10,
    comments: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Main() {
  const { data: user } = useUser();

  return (
    <View>
      <ScrollView>
        <View padding="$4" gap="$4">
          <View
            flexDirection="row"
            gap="$4"
            alignItems="center"
            paddingVertical="$2"
          >
            <Avatar src={user?.avatarUrl} />

            <Link href="/post" style={{ flex: 1, display: "flex" }}>
              <View width="100%" pointerEvents="none">
                <Input
                  width="100%"
                  placeholder="¿En qué estás pensando?"
                  borderRadius="$9"
                />
              </View>
            </Link>
          </View>

          {reviews.map((r, i) => (
            <ReviewCard key={i} data={r} />
          ))}
        </View>
      </ScrollView>

      <Link href="/post" asChild>
        <Button
          theme="green"
          circular
          position="absolute"
          bottom="$2"
          right="$2"
          size="$6"
          icon={Pencil}
        />
      </Link>
    </View>
  );
}
