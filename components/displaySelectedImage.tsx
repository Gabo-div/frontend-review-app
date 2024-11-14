import React from 'react';
import { Modal, View, Image, StyleSheet } from 'react-native';
import { Trash, Send } from '@tamagui/lucide-icons';
import { Button, YStack } from 'tamagui';

interface Props {
  uri: string;
  onSend: () => void;
  onCancel: () => void;
}

const DisplaySelectedImage = ({ uri, onSend, onCancel }: Props) => {
  return (
    <Modal visible={!!uri} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
        
        <YStack style={styles.buttonContainer}>
          <Button 
            icon={<Trash size={23} color="white" />} 
            onPress={onCancel} 
            size="$4" 
            backgroundColor="rgba(255, 59, 48, 0.7)"
            borderRadius={30}
            style={styles.button}
          >Deshacer
          </Button>
          <Button 
            icon={<Send size={23} color="white" />} 
            onPress={onSend} 
            size="$4" 
            backgroundColor="rgba(0, 122, 255, 0.7)"
            borderRadius={50}
            style={styles.button}
          >
          Enviar
          </Button>
        </YStack>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    top: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
});

export default DisplaySelectedImage;