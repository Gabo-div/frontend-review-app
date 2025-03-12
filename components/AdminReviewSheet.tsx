import { deleteReview } from "@/services/reviews";
import { useToastController } from "@tamagui/toast";
import { Button, Separator, Sheet, Text, View } from "tamagui";

interface Props {
  reviewId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function AdminReviewSheet({
  reviewId,
  open,
  onOpenChange,
}: Props) {
  const toast = useToastController();

  const onDelete = async () => {
    const { success } = await deleteReview(reviewId);

    if (success) {
      toast.show("Reseña eliminada", {
        message: "La reseña ha sido eliminada correctamente",
        native: true,
      });
      onOpenChange(false);
    } else {
      toast.show("Ha ocurrido un error", {
        message: "No hemos podido eliminar la reseña",
        native: true,
        type: "error",
      });
    }
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={!!open}
      open={open}
      onOpenChange={onOpenChange}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="quick"
      modal
    >
      <Sheet.Overlay />
      <Sheet.Handle backgroundColor="$color12" opacity={1} />
      <Sheet.Frame
        backgroundColor="$color2"
        borderTopLeftRadius="$radius.9"
        borderTopRightRadius="$radius.9"
      >
        <Text textAlign="center" marginBottom="$4" marginTop="$6">
          Administrar
        </Text>
        <Separator />
        <View padding="$4">
          <Button onPress={onDelete}>Eliminar</Button>
        </View>
      </Sheet.Frame>
    </Sheet>
  );
}
