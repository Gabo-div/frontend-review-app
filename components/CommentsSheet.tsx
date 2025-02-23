import { Sheet } from "@tamagui/sheet";
import CommentsBox from "./CommentsBox";
import { CommentsBoxProvider } from "@/contexts/commentsBoxContext";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import Toaster from "./Toaster";

interface SheetDemoProps {
  reviewId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommentsSheet = ({
  reviewId,
  open,
  onOpenChange,
}: SheetDemoProps) => {
  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={!!open}
        open={open}
        onOpenChange={onOpenChange}
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
          {open ? (
            <ToastProvider>
              <CommentsBoxProvider reviewId={reviewId}>
                <CommentsBox />
              </CommentsBoxProvider>
              <Toaster />
              <ToastViewport
                flexDirection="column"
                top="$4"
                left={0}
                right={0}
              />
            </ToastProvider>
          ) : null}
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default CommentsSheet;
