import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, ScrollView, Text, View, YStack } from "tamagui";
import { z } from "zod";

const inputsSchema = z.object({
  username: z.string().min(1, "Debes ingresar un nombre de usuario"),
  email: z.string().email("Debes ingresar un correo válido"),
  password: z.string().min(1, "Debes ingresar una contraseña"),
});

type Inputs = z.infer<typeof inputsSchema>;

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => console.log(data);

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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
