import React from 'react';
import { Modal, View, Image, Button, StyleSheet } from 'react-native';

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
        <View style={styles.buttonContainer}>
          <Button title="Enviar" onPress={onSend} />
          <Button title="Cancelar" onPress={onCancel} color="red" />
        </View>
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
    width: '90%',
    height: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '60%',
  },
});

export default DisplaySelectedImage;
