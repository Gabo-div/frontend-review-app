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
import useUser from "@/hooks/useUser";
import { useToastController } from "@tamagui/toast";
import { useAuthStore } from "@/stores/authStore";
import { useForm, Controller } from "react-hook-form";

export default function EditButton() {
  const [isOpen, setIsOpen] = useState(false);
  const maxLength = 200;

  const { data: user, refetch } = useUser();
  const toast = useToastController();
  const token = useAuthStore((state) => state.token);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      description: user?.description || "",
    },
  });

    const handleOpenSheet = () => {
        setIsOpen(true);
        reset({
            name: user?.displayName || "",
            username: user?.username || "",
            email: user?.email || "",
            password: "",
            description: user?.description || "",
        });
    };


  const onSubmit = async (data:any) => {
    try {
      const payload = JSON.stringify({
        displayName: data.name,
        username: data.username,
        email: data.email,
        description: data.description,
      });

      const res = await fetch(`${process.env.API_URL}/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (res.ok) {
        await refetch();
        setIsOpen(false);
        toast.show("Perfil actualizado", {
          message: "Tu perfil ha sido actualizado correctamente",
        });
      } else {
        const errorData = await res.json();
        console.log("Error Data:", errorData);
        toast.show("Error al actualizar el perfil", {
          message:
            errorData.message || "Hubo un problema al actualizar tu perfil",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.show("Error al actualizar el perfil", {
        message: error.message || "Hubo un problema al actualizar tu perfil",
        type: "error",
      });
    }
  };


    // Close sheet and reset.
    const handleClose = () => {
        setIsOpen(false);
        reset();
    }

  return (
    <>
      <Button
        alignItems="center"
        justifyContent="center"
        height={35}
        onPress={handleOpenSheet}
      >
        Editar Perfil
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={handleClose}
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
                    htmlFor="name"
                    fontSize={14}
                    color="$primaryText"
                    fontWeight="bold"
                  >
                    Nombre
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "El nombre es requerido",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="name"
                        placeholder="Ingresa tu nuevo nombre"
                        size="$3"
                        borderRadius="$3"
                        padding="$2"
                        fontSize={12}
                        maxWidth="100%"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="name"
                  />
                   {errors.name && <Text color="red">{errors.name.message}</Text>}
                </Fieldset>

                {/* Usuario */}
                <Fieldset>
                  <Label
                    htmlFor="username"
                    fontSize={14}
                    color="$primaryText"
                    fontWeight="bold"
                  >
                    Usuario
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "El usuario es requerido",
                      minLength: {
                        value: 3,
                        message: "El usuario debe tener al menos 3 caracteres",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="username"
                        placeholder="Ingresa tu nuevo usuario"
                        size="$3"
                        borderRadius="$3"
                        padding="$2"
                        fontSize={12}
                        maxWidth="100%"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="username"
                  />
                    {errors.username && <Text color="red">{errors.username.message}</Text>}
                </Fieldset>

                {/* Correo */}
                <Fieldset>
                  <Label
                    htmlFor="email"
                    fontSize={14}
                    color="$primaryText"
                    fontWeight="bold"
                  >
                    Correo
                  </Label>
                  <Controller
                    control={control}
                    rules={{
                      required: "El correo es requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Ingresa un correo válido",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="email"
                        placeholder="Ingresa tu nuevo correo"
                        size="$3"
                        borderRadius="$3"
                        padding="$2"
                        fontSize={12}
                        maxWidth="100%"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="email"
                  />
                    {errors.email && <Text color="red">{errors.email.message}</Text>}
                </Fieldset>

                {/* Contraseña */}
                <Fieldset>
                  <Label
                    htmlFor="password"
                    fontSize={14}
                    color="$primaryText"
                    fontWeight="bold"
                  >
                    Contraseña
                  </Label>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry
                        size="$3"
                        borderRadius="$3"
                        padding="$2"
                        fontSize={12}
                        maxWidth="100%"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />
                    {/* {errors.password && <Text color="red">{errors.password.message}</Text>} */}
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
                  <Controller
                    control={control}
                    rules={{
                      maxLength: {
                        value: maxLength,
                        message: `La descripción no puede exceder los ${maxLength} caracteres`,
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <Input
                          id="description"
                          placeholder="Ingresa una nueva descripción"
                          multiline
                          numberOfLines={4}
                          verticalAlign="top"
                          size="$3"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
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
                          {value.length}/{maxLength} caracteres
                        </Text>
                      </>
                    )}
                    name="description"
                  />
                    {errors.description && <Text color="red">{errors.description.message}</Text>}
                </Fieldset>

                {/* Botón de guardar */}
                <XStack alignSelf="center" gap="$4" marginTop="$4">
                  <Button
                    onPress={handleClose}
                    marginBottom="$4"
                    size="$2"
                    width={100}
                    height={35}
                    aria-label="Close"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onPress={handleSubmit(onSubmit)}
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