import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {Aperture, Image as ImageIcon, SwitchCamera, Zap, ZapOff,Repeat} from "@tamagui/lucide-icons";
import { Button, Stack, YStack, Text, Theme, useTheme,Slider } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image } from 'react-native';
import DisplaySelectedImage from './displaySelectedImage';
import { getImageURI, SendImage } from '@/services/imagenServices';
import { View } from 'react-native';

export function ScreenCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const lastTap = useRef<number>(0);
  const [zoom, setZoom] = useState(0); 

  const pickImage = async () => {
    // Solicitar permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
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

  if (!permission) {
    return <Stack />;
  }

  if (!permission.granted) {
    return (
      <YStack flex={1} justifyContent='center' alignContent='center'>
        <Text paddingBottom="$2">We need your permission to show the camera</Text>
        <Button onPress={requestPermission}> grant permission  </Button>
      </YStack>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.current?.takePictureAsync()
      console.log(photo);
      if (!photo) return;
      setSelectedImage(photo.uri);
    }
  }

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      toggleCameraFacing();
    }
    lastTap.current = now;
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const onSend =  async() => {  
    try {
      const imagenBlob = await getImageURI(selectedImage)
      console.log("imagenBlob: ")
      console.log(imagenBlob)
      await SendImage(imagenBlob, selectedImage)
      setSelectedImage('')
      
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <YStack flex={1} justifyContent="center" width="100%">
        <CameraView 
            ref={camera}
            style={{ flex: 1 }}
            facing={facing}
            enableTorch={torch}
            zoom={zoom}
            flash="auto"
        >
        </CameraView>

        <YStack //FLASH
            position="absolute" 
            top={10} 
            right={10} 
            flexDirection="row" 
            width="auto" 
            height={50} 
            justifyContent="center"  // Alinea todo al centro
            alignItems="center"
        > 
            <YStack alignItems="center">
                <Button
                    circular
                    size="$2"
                    backgroundColor="transparent"
                    onPress={() => setTorch(!torch)}
                    icon={torch ? <Zap size={28} color="white" /> : <ZapOff size={28} color="white" />}
                />
                <Text style={{ color: 'white', marginTop: 5 }}>Flash</Text>
            </YStack>
        </YStack>

        <YStack //ZOOM
            position="absolute"
            bottom={110}
            width="100%"
            alignItems="center"
            paddingHorizontal="$4"
        >
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                Zoom: {(zoom*100).toFixed(0)}%
            </Text>

            <Slider 
                value={[zoom]}
                onValueChange={value => setZoom(value[0])}
                min={0} 
                max={1} 
                step={0.05} 
                backgroundColor="rgba(255, 255, 255, 0.5)"
                style={{
                    width: '60%',
                    height: 8,
                    borderRadius: 100,
                    shadowColor: '#000',
                    position: 'relative',
                }}
            >
                <YStack 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: 2,
                        shadowOpacity: 0.3,
                        backgroundImage: 'linear-gradient(to right, #808080 0%, #808080 10%, transparent 10%, transparent 100%)',
                        backgroundSize: '20px 100%',
                    }}
                />
            </Slider>
        </YStack>

        <YStack
            position="absolute" 
            bottom={0}
            flexDirection="row" 
            width="100%" 
            height={90}
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal="$6"
        > 
            <Button
                circular
                size="$6"
                backgroundColor="transparent"
                onPress={pickImage}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <YStack alignItems="center">
                    <ImageIcon size={32} color="white" />
                    <Text style={{ color: 'white', marginTop: 5 }}>Galería</Text>
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                    elevation: 8,
                }}
                onPress={takePicture}
                marginBottom="$5"
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
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
          >
              <YStack alignItems="center">
                  <Repeat size={32} color="white" />
                  <Text style={{ color: 'white', marginTop: 5 }}>Voltear</Text>
              </YStack>
          </Button>

        </YStack>

        {selectedImage && (
          <DisplaySelectedImage uri={selectedImage} onSend={onSend} onCancel={() => setSelectedImage('')} />
        )}
                
    </YStack>
  );
}

