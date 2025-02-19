import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { Image as ImageIcon, Zap, ZapOff, Repeat } from "@tamagui/lucide-icons";
import { Button, YStack, Text, Slider, Sheet } from "tamagui";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import DisplaySelectedImage from "./displaySelectedImage";
import { getImageURI, sendImage } from "@/services/imagenServices";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { PlaceDetails } from "@/models/Place";
import { DisplayPlaces } from "./DisplayPlaces";

export function ScreenCamera() {
  const insets = useSafeAreaInsets();

  const [hasPermission, setHasPermission] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [zoom, setZoom] = useState(0);
  const [places, setPlaces] = useState<Omit<PlaceDetails, "category">[]>([])


  useEffect(() => {
    (async () => {
      if (!permission) {
        const { granted } = await requestPermission();
        setHasPermission(granted);
      } else {
        setHasPermission(permission.granted);
      }
    })();
  }, [permission, requestPermission]);

  const pickImage = async () => {
    // Solicitar permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Se necesita permiso para acceder a la galería.",
      );
      return;
    }

    // Abrir la galería para seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.current?.takePictureAsync();
      console.log({photo});
      if (!photo) return;
      setSelectedImage(photo.uri);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const onSend = async () => {
    try {
      const imagenBlob = await getImageURI(selectedImage);
      console.log(imagenBlob);
      const places = await sendImage(selectedImage, { latitude: -62.7442323, longitude: 8.2918355 });
      setPlaces(places)
      console.log({places})
      setSelectedImage("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!hasPermission) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  // const handlePinchGesture = (event: { nativeEvent: { scale: any } }) => {
  //   const scale = event.nativeEvent.scale;
  //   const newZoom = Math.min(Math.max(zoom + (scale - 1) * 0.1, 0), 1);
  //   setZoom(newZoom);
  // };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      width="100%"
      style={{ marginTop: insets.top }}
    >
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      {/* <PinchGestureHandler onGestureEvent={handlePinchGesture}> */}
      <View style={{ flex: 1 }}>
        <CameraView
          ref={camera}
          style={{ flex: 1 }}
          facing={facing}
          enableTorch={torch}
          zoom={zoom}
          flash="auto"
        ></CameraView>
      </View>
      {/* </PinchGestureHandler> */}
      {/* </GestureHandlerRootView> */}

      <YStack //FLASH
        position="absolute"
        top={10}
        right={10}
        flexDirection="row"
        width="auto"
        height={50}
        justifyContent="center"
        alignItems="center"
      >
        <YStack alignItems="center">
          <Button
            circular
            size="$2"
            backgroundColor="transparent"
            onPress={() => setTorch(!torch)}
            icon={
              torch ? (
                <Zap size={28} color="white" />
              ) : (
                <ZapOff size={28} color="white" />
              )
            }
          />
          <Text style={{ color: "white", marginTop: 5 }}>Flash</Text>
        </YStack>
      </YStack>

      <YStack //ZOOM
        position="absolute"
        bottom={110}
        width="100%"
        alignItems="center"
        paddingHorizontal="$4"
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
          Zoom: {(zoom * 100).toFixed(0)}%
        </Text>

        <Slider
          value={[zoom]}
          onValueChange={(value) => setZoom(value[0])}
          min={0}
          max={1}
          step={0.05}
          backgroundColor="rgba(255, 255, 255, 0.5)"
          style={{
            width: "60%",
            height: 8,
            borderRadius: 100,
            shadowColor: "#000",
            position: "relative",
          }}
        >
          <YStack
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 2,
              shadowOpacity: 0.3,
              backgroundImage:
                "linear-gradient(to right, #808080 0%, #808080 10%, transparent 10%, transparent 100%)",
              backgroundSize: "20px 100%",
            }}
          />
        </Slider>
      </YStack>

      <YStack
        position="absolute"
        bottom={0}
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        alignItems="center"
        padding="$4"
      >
        <Button
          circular
          size="$6"
          backgroundColor="transparent"
          onPress={pickImage}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <YStack alignItems="center">
            <ImageIcon size={32} color="white" />
            <Text style={{ color: "white", marginTop: 5 }}>Galería</Text>
          </YStack>
        </Button>

        <Button
          size="$6"
          left="$3.5"
          backgroundColor="transparent"
          style={{
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 35,
            width: 50,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}
          onPress={takePicture}
          marginBottom="$1"
        >
          <View
            style={{
              backgroundColor: "white",
              borderColor: "rgba(0, 0, 0, 0.5)",
              borderWidth: 4,
              borderRadius: 30,
              width: 60,
              height: 60,
            }}
          />
        </Button>

        <Button
          left="$4"
          onPress={toggleCameraFacing}
          backgroundColor="transparent"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <YStack alignItems="center">
            <Repeat size={32} color="white" />
            <Text style={{ color: "white", marginTop: 5 }}>Voltear</Text>
          </YStack>
        </Button>
      </YStack>

      {selectedImage && (
        <DisplaySelectedImage
          uri={selectedImage}
          onSend={onSend}
          onCancel={() => setSelectedImage("")}
        />
      )}

      {places.length > 0 && (
        <YStack
          position="absolute"
          top={0}
          width="100%"
          height="100%"
          backgroundColor="rgba(200, 200, 200, 1)"
          alignItems="center"
          // padding="$4"
        >
          <Sheet
            forceRemoveScrollEnabled={true}
            open={true}
            onOpenChange={() => setPlaces([])}
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="quick"
            snapPoints={[95]}
            modal
          >
            <Sheet.Overlay />
            <Sheet.Handle backgroundColor="$color12" opacity={1} />
            <Sheet.Frame
              backgroundColor="$color2"
              borderTopLeftRadius="$radius.9"
              borderTopRightRadius="$radius.9"
            >
              <DisplayPlaces
                places={places}
                onPressItem={() => setPlaces([])}
              />
            </Sheet.Frame>
          </Sheet>
        </YStack>
      )}
    </YStack>
  );
}
