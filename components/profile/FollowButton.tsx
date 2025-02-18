import { User } from "@/models/User";
import { useState } from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

interface Props {
  user: User;
}

export default function FollowButton({ user }: Props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Función para manejar el botón de seguir
  const handleFollowButtonClick = () => {
    if (isFollowing) {
      setShowDialog(true);
    } else {
      setIsFollowing(true);
    }
  };

  // Confirmar dejar de seguir
  const handleConfirmUnfollow = () => {
    setIsFollowing(false);
    setShowDialog(false);
  };

  // Cancelar acción de dejar de seguir
  const handleCancelUnfollow = () => {
    setShowDialog(false);
  };

  return (
    <>
      {/* Botón de Seguir/Siguiendo */}
      <Button
        alignItems="center"
        justifyContent="center"
        height={35}
        theme={isFollowing ? "green" : "gray"}
        onPress={handleFollowButtonClick}
      >
        {isFollowing ? "Siguiendo" : "Seguir"}
      </Button>

      {/* Dialogo de Alerta */}
      <AlertDialog
        open={showDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) setShowDialog(false);
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            key="content"
            bordered
            elevate
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            scale={1}
            opacity={1}
            y={0}
            height="500%"
            padding="$4"
          >
            <YStack gap="$4" alignItems="center" alignContent="center">
              <AlertDialog.Title size="$6">DEJAR DE SEGUIR</AlertDialog.Title>
              <AlertDialog.Description textAlign="center">
                ¿Estás seguro de que deseas dejar de seguir a {user.username}?
              </AlertDialog.Description>

              <XStack gap="$3" alignItems="center" alignContent="center">
                <AlertDialog.Cancel asChild>
                  <Button size="$3" theme="gray" onPress={handleCancelUnfollow}>
                    Cancelar
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button size="$3" theme="red" onPress={handleConfirmUnfollow}>
                    Aceptar
                  </Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  );
}
