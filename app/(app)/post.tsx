import RateIndicator from "@/components/home/RateIndicator";
import { Images, Pencil } from "@tamagui/lucide-icons";
import { useState } from "react";
import {
  View,
  Text,
  YStack,
  Label,
  TextArea,
  Slider,
  XStack,
  Button,
  Square,
  ScrollView,
} from "tamagui";
import * as ImagePicker from "expo-image-picker";
import PostImagesCarousel from "@/components/post/PostImagesCarousel";
import PlaceSelector from "@/components/post/PlaceSelector";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPlaceByMapsId } from "@/services/places";
import { postReview } from "@/services/reviews";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";

const inpustSchema = z.object({
  mapsId: z
    .string({ message: "Debes seleccionar una ubicación" })
    .min(1, "Debes seleccionar una ubicación"),
  text: z
    .string({ message: "La reseña no puede estar vacía" })
    .min(1, "La reseña no puede estar vacía"),
  rate: z.number(),
  images: z.array(z.string()),
});

type Inputs = z.infer<typeof inpustSchema>;

export default function Post() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(inpustSchema),
    defaultValues: {
      rate: 50,
      text: "",
      mapsId: "",
      images: [],
    },
  });

  const [images, setImages] = useState<string[]>([]);

  const toast = useToastController();
  const router = useRouter();

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages(uris);
      setValue("images", uris, {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: Inputs) => {
    try {
      const place = await getPlaceByMapsId(data.mapsId);

      const { success } = await postReview({
        placeId: place.id,
        text: data.text,
        rate: data.rate,
        images: data.images,
      });

      if (!success) {
        throw new Error("Error");
      }

      toast.show("Reseña publicada", {
        message: "Tu reseña ha sido publicada correctamente",
      });

      router.back();
    } catch (error) {
      console.log(error);
      toast.show("Ha ocurrido un error", {
        message: "No hemos podido publicar tu reseña",
        type: "error",
      });
    }
  };

  return (
    <ScrollView>
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding="$6"
        paddingTop="$4"
        gap="$2"
      >
        <Text fontSize="$8" fontWeight="bold" width="100%">
          Publicar Reseña
        </Text>

        <YStack width="100%">
          <Label>Ubicación</Label>

          <YStack width="100%" gap="$2">
            <PlaceSelector
              onPlaceSelect={(place) => {
                if (!place) {
                  setValue("mapsId", "", { shouldValidate: true });
                  return;
                }

                setValue("mapsId", place.maps_id, { shouldValidate: true });
              }}
            />
            {errors.mapsId && (
              <Text color="$red10" fontSize="$2">
                {errors.mapsId.message}
              </Text>
            )}
          </YStack>
        </YStack>

        <YStack width="100%">
          <Label>Reseña</Label>

          <YStack width="100%" gap="$2">
            <Controller
              control={control}
              name="text"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  placeholder="Tu opinión"
                  numberOfLines={6}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.text && (
              <Text color="$red10" fontSize="$2">
                {errors.text.message}
              </Text>
            )}
          </YStack>
        </YStack>

        <Controller
          control={control}
          name="rate"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <YStack width="100%">
              <XStack justifyContent="space-between">
                <Label>Calificación</Label>
                <RateIndicator rate={value / 10} />
              </XStack>
              <Slider
                value={[value]}
                onValueChange={(v) => onChange(v[0])}
                max={50}
                step={1}
              >
                <Slider.Track>
                  <Slider.TrackActive backgroundColor="$green8" />
                </Slider.Track>
                <Slider.Thumb size="$2" index={0} circular />
              </Slider>
            </YStack>
          )}
        />

        <YStack width="100%">
          <Label>Imagenes</Label>
          {images.length ? (
            <View position="relative">
              <PostImagesCarousel images={images} />
              <Button
                position="absolute"
                top="$2"
                right="$2"
                circular
                icon={Pencil}
                size="$3"
                onPress={pickImages}
              />
            </View>
          ) : (
            <Square
              backgroundColor="$color4"
              borderRadius="$4"
              width="100%"
              aspectRatio={1}
              gap="$4"
              onPress={pickImages}
            >
              <Images size="$4" color="$color11" />
              <Text color="$color11">Subir Imagenes</Text>
            </Square>
          )}
        </YStack>

        <Button width="100%" marginTop="$4" onPress={handleSubmit(onSubmit)}>
          Publicar
        </Button>
      </View>
    </ScrollView>
  );
}
