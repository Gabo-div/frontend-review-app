import React from "react";
import { User, Map } from "@tamagui/lucide-icons";
import { Dimensions } from "react-native";
import {
  View,
  YStack,
  XStack,
  Text,
  Avatar,
  Image,
  styled,
  ScrollView,
} from "tamagui";

import EditBotton from "@/components/profile/EditButton";
import FollowButton from "@/components/profile/FollowButton";

const margen = 22;

let isCurrentUser = false; //Variar de usuario = true / visitante = false

const { width } = Dimensions.get("window");

const userData = {
  id: 1,
  name: "name",
  email: "email",
  passwoord: "password",
  description: "description",
  followersCount: 10,
  followedCount: 10,
  postCount: 10,
};

const TextNum = styled(Text, {
  marginTop: "$6",
  fontSize: "$6",
  marginHorizontal: "$2",
  color: "$color",
  fontWeight: "bold",
  textAlign: "center",
});

const TextCursiva = styled(Text, {
  fontSize: "$4",
  fontStyle: "italic",
});

// Lógica Botón Seguir

const publicaciones = [
  "http://picsum.photos/200/300",
  "http://picsum.photos/200/30",
  "http://picsum.photos/200/3",
  "http://picsum.photos/200/",
  "http://picsum.photos/20",
  "http://picsum.photos/2",
  "http://picsum.photos/200/300",
  "http://picsum.photos/200/300",
  "http://picsum.photos/2",
  "http://picsum.photos/200/300",
  "http://picsum.photos/200/300",
];

export default function Profile() {
  // Calcular el ancho de las imágenes para que hayan 3 por fila
  const gap = 1.5;
  const imageWidth = (width - 2 * margen - 2 * gap) / 3;

  return (
    <ScrollView>
      <View
        width="100%"
        height="100%"
        padding="$4"
        backgroundColor="$background"
      >
        {/* Datos del Usuario */}
        <YStack
          height="auto"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {/* Perfil - post - seguidores - seguidos */}
          <XStack
            width="100%"
            alignContent="center"
            justifyContent="center"
            marginBottom="$2"
          >
            <Avatar circular size="$10" backgroundColor="$color4">
              <Avatar.Image
                alignItems="center"
                justifyContent="center"
                src="http://picsum.photos" //Src erroneo para cargar la imagen predeterminada
              />
              <Avatar.Fallback
                alignItems="center"
                justifyContent="center"
                bc="$backgroundFocus"
              >
                <User size="$8" strokeWidth={1.25} />
              </Avatar.Fallback>
            </Avatar>

            {/* Valores Numericos */}
            <TextNum marginLeft="$4">
              {userData.postCount}
              {"\n"}
              <TextCursiva>Reseñas</TextCursiva>
            </TextNum>
            <TextNum>
              {userData.followersCount} {"\n"}
              <TextCursiva>Seguidores</TextCursiva>
            </TextNum>
            <TextNum>
              {userData.followedCount}
              {"\n"}
              <TextCursiva>Seguidos</TextCursiva>
            </TextNum>
          </XStack>

          {/* Nombre de Usuario */}
          <Text marginLeft="$2" fontSize="$5" fontWeight="bold" color="$color">
            {userData.name}
          </Text>

          {/* Bibliografía */}
          <Text marginLeft="$2" fontSize="$4" color="$color">
            {userData.description}
          </Text>
        </YStack>

        {/* Botón Condicional para seguir o editar perfil*/}
        <View justifyContent="center" marginVertical="$5" width="100%">
          {isCurrentUser ? <EditBotton /> : <FollowButton user={userData} />}
        </View>

        {/* Publicaciones */}
        <YStack alignItems="center" justifyContent="center">
          <Map size="$2" strokeWidth={1} color={"$color"} />

          <YStack alignItems="flex-start" marginTop="$5">
            <XStack flexWrap="wrap" gap={gap} width="100%">
              {publicaciones.map((imageUrl, index) => (
                <YStack key={index} marginRight={gap} marginBottom={gap}>
                  <Image
                    src={imageUrl}
                    width={imageWidth}
                    height={imageWidth}
                    borderRadius="$4"
                    alt={`Publicación ${index + 1}`}
                  />
                </YStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
      </View>
    </ScrollView>
  );
}
