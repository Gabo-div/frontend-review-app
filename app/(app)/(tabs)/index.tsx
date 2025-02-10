import { View, ScrollView } from "tamagui";
import ReviewCard from "@/components/home/ReviewCard";
import { Review } from "@/types/review";

const reviews: Review[] = [
  {
    place: "Beijing House",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "El servicio es otro nivel. Los meseros son súper amables y atentos. Te hacen sentir como en casa desde el momento en que entras por la puerta.",
    avatar: "https://avatars.githubusercontent.com/u/64453625?v=4",
    name: "Gabriel Hernandez",
    username: "_elgabo",
    likes: 20,
    dislikes: 10,
    comments: 15,
  },
  {
    place: "La Llovizna",
    content:
      "El parque es un verdadero refugio para los amantes de la naturaleza. Con senderos bien cuidados que serpentean a través de densos bosques y prados abiertos, es el lugar ideal para una caminata relajante.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQHVandjgMz3fw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1681950784018?e=1738800000&v=beta&t=JZuxdJM4lyVVPTlxVwsVjB7py-fZfFjlLQr__E82i7M",
    name: "Inés Sánchez",
    username: "_iness",
    likes: 20,
    dislikes: 10,
    comments: 15,
  },
];

export default function Main() {
  return (
    <ScrollView>
      <View padding="$4" gap="$4">
        {reviews.map((r, i) => (
          <ReviewCard key={i} data={r} />
        ))}
      </View>
    </ScrollView>
  );
}
