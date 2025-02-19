import { verifyUsernameExists } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Input, ScrollView, Text, View, YStack } from "tamagui";
import { z } from "zod";
import * as ImagePicker from "expo-image-picker";

const inputsSchema = z.object({
  avatarUrl: z.string().min(1, "Debes seleccionar una imagen"),
  displayName: z.string().min(1, "Debes ingresar un nombre"),
  username: z
    .string()
    .min(1, "Debes ingresar un nombre de usuario")
    .refine(async (username) => !(await verifyUsernameExists(username)), {
      message: "El nombre de usuario ya está en uso",
    }),
  email: z.string().email("Debes ingresar un correo válido"),
  password: z.string().min(1, "Debes ingresar una contraseña"),
});

type Inputs = z.infer<typeof inputsSchema>;

export default function SignUp() {
  const authStore = useAuthStore();
  const [isError, setIsError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      avatarUrl: "",
      displayName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const onSubmit = async (data: Inputs) => {
    const success = await authStore.signup(data);
    setIsError(!success);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue("avatarUrl", result.assets[0].uri, {
        shouldValidate: true,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View padding="$4" alignItems="center" justifyContent="center" flex={1}>
          <View
            alignItems="center"
            width="100%"
            paddingHorizontal="$4"
            gap="$4"
          >
            <YStack width="100%" gap="$2" alignItems="center">
              <Avatar
                circular
                size="$11"
                onPress={pickImage}
                backgroundColor="$color10"
              >
                <Avatar.Image src={image || undefined} />
                <Avatar.Fallback alignItems="center" justifyContent="center">
                  <User size="$4" />
                </Avatar.Fallback>
              </Avatar>
              {errors.avatarUrl && (
                <Text color="$red10" fontSize="$2">
                  {errors.avatarUrl.message}
                </Text>
              )}
            </YStack>

            <YStack width="100%" gap="$2">
              <Controller
                control={control}
                name="displayName"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    width="100%"
                    placeholder="Nombre"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.displayName && (
                <Text color="$red10" fontSize="$2">
                  {errors.displayName.message}
                </Text>
              )}
            </YStack>

            <YStack width="100%" gap="$2">
              <Controller
                control={control}
                name="username"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    width="100%"
                    placeholder="Usuario"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.username && (
                <Text color="$red10" fontSize="$2">
                  {errors.username.message}
                </Text>
              )}
            </YStack>

            <YStack width="100%" gap="$2">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    width="100%"
                    placeholder="Correo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text color="$red10" fontSize="$2">
                  {errors.email.message}
                </Text>
              )}
            </YStack>

            <YStack width="100%" gap="$2">
              <Controller
                control={control}
                name="password"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    width="100%"
                    placeholder="Contraseña"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text color="$red10" fontSize="$2">
                  {errors.password.message}
                </Text>
              )}
            </YStack>

            <Button width="100%" onPress={handleSubmit(onSubmit)}>
              Crear cuenta
            </Button>
            <View width="100%" alignItems="center">
              <Text>
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" asChild>
                  <Text color="$green10">Ingresar</Text>
                </Link>
              </Text>
            </View>
            {isError ? (
              <Text color="$red10" fontSize="$2" textAlign="center">
                Ha ocurrido un error al crear tu cuenta.
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
