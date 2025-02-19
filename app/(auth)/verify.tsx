import useUser from "@/hooks/useUser";
import { generateCode, verifyCode } from "@/services/verify";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailQuestion } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Spinner, Text, View, YStack } from "tamagui";
import { z } from "zod";

const inputsSchema = z.object({
  code: z
    .string()
    .min(1, "Debes ingresar el código de verificación")
    .max(6, "El código de verificación debe tener 6 dígitos"),
});

type Inputs = z.infer<typeof inputsSchema>;

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { data: user, refetch } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    if (!user || user.verified) {
      return;
    }

    const success = await verifyCode({
      userId: user.id,
      code: data.code,
    });

    if (success) {
      refetch();
    } else {
      setFormError("code", {
        type: "manual",
        message: "El código de verificación es incorrecto",
      });
    }
  };

  useEffect(() => {
    if (!user || user.verified) {
      return;
    }

    generateCode({
      email: user.email,
      userId: user.id,
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [user]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
      >
        <Spinner size="large" color="$color" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          flex={1}
          alignItems="center"
          justifyContent="center"
          padding="$10"
        >
          <Text fontSize="$8" color="$red10" fontWeight="bold">
            Error
          </Text>
          <Text fontSize="$2" textAlign="center">
            Ocurrió un error al enviar el código de verificación. Por favor
            intenta más tarde.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} alignItems="center" justifyContent="center" padding="$4">
        <View paddingHorizontal="$4" alignItems="center" width="100%">
          <MailQuestion size="$11" marginBottom="$2" />
          <Text
            fontSize="$8"
            color="$green11"
            fontWeight="bold"
            textAlign="center"
            marginBottom="$4"
          >
            Verifica tu Identidad
          </Text>

          <Text textAlign="center" fontSize="$2">
            Te enviamos un código de verificación a{" "}
            <Text color="$green11">{user.email}</Text>. Ingresa el código a
            continuación para verificar tu cuenta.
          </Text>

          <View marginTop="$4" flexDirection="row" width="100%" gap="$4">
            <YStack flex={1} gap="$2">
              <Controller
                control={control}
                name="code"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    width="100%"
                    placeholder="Usuario"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      if (value.endsWith(" ")) {
                        return;
                      }

                      if (isNaN(Number(value))) {
                        return;
                      }

                      onChange(value);
                    }}
                    secureTextEntry
                    keyboardType="numeric"
                    maxLength={6}
                    value={value}
                  />
                )}
              />
            </YStack>
            <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>
          </View>
          {errors.code && (
            <Text color="$red10" fontSize="$1" marginTop="$4">
              {errors.code.message}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
