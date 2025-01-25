import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Spinner, Text, View, YStack } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const inputsSchema = z.object({
  username: z.string().min(1, "Debes ingresar un nombre de usuario"),
  password: z.string().min(1, "Debes ingresar una contraseña"),
});

type Inputs = z.infer<typeof inputsSchema>;

export default function Login() {
  const authStore = useAuthStore();
  const [isError, setIsError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    const success = await authStore.login(data);
    setIsError(!success);
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View padding="$4" alignItems="center" justifyContent="center" flex={1}>
        <View alignItems="center" width="100%" paddingHorizontal="$4" gap="$4">
          <YStack>
            <Text
              fontSize="$10"
              color="$green11"
              fontWeight="bold"
              textAlign="center"
            >
              Leif
            </Text>
            <Text textAlign="center" lineHeight="$4" color="$color9">
              Opiniones auténticas de lugares increíbles
            </Text>
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

          <Button
            width="100%"
            onPress={handleSubmit(onSubmit)}
            disabled={authStore.isLoading}
            iconAfter={authStore.isLoading ? <Spinner /> : null}
          >
            Ingresar
          </Button>

          <View width="100%" alignItems="center">
            <Text>
              ¿No tienes una cuenta?{" "}
              <Link href="/signup" asChild>
                <Text color="$green10">Crear una</Text>
              </Link>
            </Text>
          </View>

          {isError ? (
            <Text color="$red10" fontSize="$2" textAlign="center">
              Ha ocurrido un error. Asegúrate de que tus credenciales sean
              válidas.
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
