import { User } from "@tamagui/lucide-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Avatar,
  Button,
  Fieldset,
  Input,
  Label,
  ScrollView,
  Sheet,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

export default function EditButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const maxLength = 200;

  return (
    <>
      <Button
        alignItems="center"
        justifyContent="center"
        height={35}
        onPress={() => setIsOpen(true)}
      >
        Editar Perfil
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        animation="medium"
        zIndex={200_000}
        modal
        dismissOnSnapToBottom
        forceRemoveScrollEnabled
        snapPoints={[90]}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle backgroundColor="$color12" opacity={1} />

        <Sheet.Frame gap="$4">
          <ScrollView>
            <View padding="$4">
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="$8"
                marginBottom="$4"
              >
                Editar Perfil
              </Text>

              <XStack alignItems="center" justifyContent="center">
                <TouchableOpacity>
                  <Avatar circular size="$8">
                    <Avatar.Image src="http://picsum.photos" />
                    <Avatar.Fallback
                      backgroundColor="$color2"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <User size="$6" strokeWidth={1.25} color={"$color"} />
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
                    numberOfLines={4}
                    verticalAlign="top"
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
                <XStack alignSelf="center" gap="$4" marginTop="$4">
                  <Button
                    onPress={() => setIsOpen(false)}
                    marginBottom="$4"
                    size="$2"
                    width={100}
                    height={35}
                    aria-label="Close"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onPress={() => setIsOpen(false)}
                    marginBottom="$4"
                    size="$2"
                    width={100}
                    height={35}
                    aria-label="Close"
                  >
                    Guardar
                  </Button>
                </XStack>
              </YStack>
            </View>
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
