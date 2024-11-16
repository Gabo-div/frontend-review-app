import React, { useState } from "react";
import { User, Map } from "@tamagui/lucide-icons";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  View,
  YStack,
  XStack,
  Text,
  Avatar,
  Image,
  styled,
  ScrollView,
  Button,
  Input,
  Adapt,
  Dialog,
  Fieldset,
  Label,
  Sheet,
  AlertDialog,
} from "tamagui";

const margen = 22;

let isCurrentUser = true; //Variar de usuario = true / visitante = false

const { width } = Dimensions.get("window");

const userData = {
  id: "id",
  name: "name",
  email: "email",
  passwoord: "password",
  description: "description",
  followers: 10,
  followed: 10,
  post: 10,
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

// Lógica Botón Editar Perfil
const EditBotton = () => {
  const [description, setDescription] = useState("");
  const maxLength = 200;

  return (
    <Dialog modal>
      <View alignItems="center" justifyContent="center">
        <Dialog.Trigger asChild>
          <Button
            alignItems="center"
            justifyContent="center"
            width={180}
            height={35}
          >
            Editar Perfil
          </Button>
        </Dialog.Trigger>
      </View>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$5">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          position="relative"
        >
          <Dialog.Title textAlign="center">Editar Perfil</Dialog.Title>
          <ScrollView>
            <XStack alignItems="center" justifyContent="center">
              <TouchableOpacity>
                <Avatar circular size="$8">
                  <Avatar.Image src="http://picsum.photos" />
                  <Avatar.Fallback bc="$backgroundFocus">
                    <User size="$8" strokeWidth={1.25} color={"$color"} />
                  </Avatar.Fallback>
                </Avatar>
              </TouchableOpacity>
            </XStack>

            <YStack gap="$2">
              {/* Nombre */}
              <Fieldset>
                <Label
                  htmlFor="nombre"
                  fontSize={14}
                  color="$primaryText"
                  fontWeight="bold"
                >
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ingresa tu nombre"
                  size="$3"
                  borderRadius="$3"
                  padding="$2"
                  fontSize={12}
                  maxWidth="100%"
                />
              </Fieldset>

              {/* Correo */}
              <Fieldset>
                <Label
                  htmlFor="correo"
                  fontSize={14}
                  color="$primaryText"
                  fontWeight="bold"
                >
                  Correo
                </Label>
                <Input
                  id="correo"
                  placeholder="Ingresa tu correo"
                  size="$3"
                  borderRadius="$3"
                  padding="$2"
                  fontSize={12}
                  maxWidth="100%"
                />
              </Fieldset>

              {/* Contraseña */}
              <Fieldset>
                <Label
                  htmlFor="s"
                  fontSize={14}
                  color="$primaryText"
                  fontWeight="bold"
                >
                  Contraseña
                </Label>
                <Input
                  id="s"
                  placeholder="Ingresa tu contraseña"
                  secureTextEntry
                  size="$3"
                  borderRadius="$3"
                  padding="$2"
                  fontSize={12}
                  maxWidth="100%"
                />
              </Fieldset>

              {/* Descripción */}
              <Fieldset>
                <Label
                  htmlFor="description"
                  fontSize={14}
                  color="$primaryText"
                  fontWeight="bold"
                >
                  Descripción
                </Label>
                <Input
                  id="description"
                  placeholder="Ingresa una descripción"
                  multiline
                  size="$3"
                  maxLength={maxLength}
                  value={description}
                  onChangeText={setDescription}
                  borderRadius="$3"
                  padding="$2"
                  fontSize={12}
                  maxWidth="100%"
                />
                <Text
                  textAlign="right"
                  marginTop="$1"
                  color="$gray10Light"
                  fontSize={12}
                >
                  {description.length}/{maxLength} caracteres
                </Text>
              </Fieldset>

              {/* Botón de guardar */}
              <View alignSelf="center">
                <Dialog.Close displayWhenAdapted asChild>
                  <Button
                    marginBottom="$4"
                    size="$2"
                    width={100}
                    height={35}
                    aria-label="Close"
                  >
                    Guardar
                  </Button>
                </Dialog.Close>
              </View>
            </YStack>
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

// Lógica Botón Seguir
const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Función para manejar el botón de seguir
  const handleFollowButtonClick = () => {
    if (isFollowing) {
      setShowDialog(true);
    } else {
      setIsFollowing(true);
    }
  };

  // Confirmar dejar de seguir
  const handleConfirmUnfollow = () => {
    setIsFollowing(false);
    setShowDialog(false);
  };

  // Cancelar acción de dejar de seguir
  const handleCancelUnfollow = () => {
    setShowDialog(false);
  };

  return (
    <View alignItems="center">
      {/* Botón de Seguir/Siguiendo */}
      <Button
        alignItems="center"
        justifyContent="center"
        width={180}
        height={35}
        theme={isFollowing ? "green" : "gray"}
        onPress={handleFollowButtonClick}
      >
        {isFollowing ? "Siguiendo" : "Seguir"}
      </Button>

      {/* Dialogo de Alerta */}
      <AlertDialog
        open={showDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) setShowDialog(false);
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            key="content"
            bordered
            elevate
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            scale={1}
            opacity={1}
            y={0}
            height="500%"
            padding="$4"
          >
            <YStack space="$3" alignItems="center" alignContent="center">
              <AlertDialog.Title size="$8">DEJAR DE SEGUIR</AlertDialog.Title>
              <AlertDialog.Description textAlign="center">
                ¿Estás seguro de que deseas dejar de seguir a {userData.name}?
              </AlertDialog.Description>

              <XStack gap="$3" alignItems="center" alignContent="center">
                <AlertDialog.Cancel asChild>
                  <Button size="$3" theme="gray" onPress={handleCancelUnfollow}>
                    Cancelar
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button size="$3" theme="red" onPress={handleConfirmUnfollow}>
                    Sí, dejar de seguir
                  </Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </View>
  );
};

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
              {userData.post}
              {"\n"}
              <TextCursiva>Reseñas</TextCursiva>
            </TextNum>
            <TextNum>
              {userData.followers} {"\n"}
              <TextCursiva>Seguidores</TextCursiva>
            </TextNum>
            <TextNum>
              {userData.followed}
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
        <View justifyContent="center" margin="$5">
          {isCurrentUser ? <EditBotton /> : <FollowButton />}
        </View>

        {/* Publicaciones */}
        <YStack alignItems="center" justifyContent="center">
          <Map size="$4" strokeWidth={1} color={"$color"} />

          <YStack alignItems="flex-start" marginTop="$4">
            <XStack flexWrap="wrap" gap={gap} width="100%">
              {publicaciones.map((imageUrl, index) => (
                <YStack key={index} marginRight={gap} marginBottom={gap}>
                  <Image
                    src={imageUrl}
                    width={imageWidth}
                    height={imageWidth}
                    borderRadius="$4"
                    resizeMode="cover"
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
