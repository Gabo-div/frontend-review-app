import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {Aperture, Image as ImageIcon, SwitchCamera, Zap, ZapOff} from "@tamagui/lucide-icons";
import { Button, Stack, YStack, Text, Theme, useTheme } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image } from 'react-native';
import DisplaySelectedImage from './displaySelectedImage';
import { getImageURI, SendImage } from '@/services/imagenServices';

export function ScreenCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<string>('');

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
            flash="auto"
        >
        </CameraView>

        <YStack 
            position="absolute" 
            top = {10} 
            right = {10} 
            flexDirection="row" 
            width="auto" 
            height={50} 
            // backgroundColor="rgba(0, 0, 0, 0.3)" 
            justifyContent="space-between"
            alignItems="center"
        > 

            <Button
                circular
                size="$4"
                backgroundColor={'black'}
                opacity={0.5}
                onPress={() => setTorch(!torch)}
                icon= {torch ? <Zap size={28} color="white" /> : <ZapOff size={28} color="white" />} 
            ></Button>

        </YStack>

        <YStack
            position="absolute" 
            bottom={0} 
            flexDirection="row" 
            width="100%" 
            height={90}
            // backgroundColor="rgba(0, 0, 0, 0.3)" 
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal="$4"
        > 

            <Button 
                circular
                size="$6"
                backgroundColor={'black'}
                opacity={0.5}
                icon={<ImageIcon size={32} color={"white"}/>} 
                onPress={pickImage}
            >
            </Button>
            <Button 
                circular
                size="$7"
                backgroundColor={'black'}
                opacity={0.5}
                icon={<Aperture size={42} color={"white"}/>} 
                onPress={takePicture} 
                marginBottom="$5"
            ></Button>

            <Button 
                circular
                size="$6"
                backgroundColor={'black'}
                opacity={0.5}
                icon={<SwitchCamera size={32} color={"white"}/>} 
                onPress={toggleCameraFacing}
            ></Button>

        </YStack>

        {selectedImage && (
          <DisplaySelectedImage uri={selectedImage} onSend={onSend} onCancel={() => setSelectedImage('')} />
        )}
                
    </YStack>
  );
}

