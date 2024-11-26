import React from "react";
import { Modal, View, Image, StyleSheet, Text } from "react-native";
import { Trash, Send } from "@tamagui/lucide-icons";
import { Button, YStack } from "tamagui";

interface Props {
  uri: string;
  onSend: () => void;
  onCancel: () => void;
}

const DisplaySelectedImage = ({ uri, onSend, onCancel }: Props) => {
  return (
    <Modal visible={!!uri} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />

        {/* Contenedor de fondo para los botones */}
        <View style={styles.buttonBackground}>
          <Button
            onPress={onCancel}
            backgroundColor="transparent"
            borderRadius={30}
            style={styles.button}
          >
            <YStack alignItems="center">
              <Trash size={23} color="white" />
              <Text style={{ color: "white", marginTop: 5 }}>Deshacer</Text>
            </YStack>
          </Button>

          <Button
            onPress={onSend}
            backgroundColor="transparent"
            borderRadius={50}
            style={styles.button}
          >
            <YStack alignItems="center">
              <Send size={23} color="white" />
              <Text style={{ color: "white", marginTop: 5 }}>Enviar</Text>
            </YStack>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DisplaySelectedImage;
