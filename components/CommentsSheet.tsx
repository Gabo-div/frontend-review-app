import { Sheet } from "@tamagui/sheet";
import CommentsBox from "./CommentsBox";
import { CommentsBoxProvider } from "@/contexts/commentsBoxContext";

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
          <CommentsBoxProvider reviewId={reviewId}>
            <CommentsBox />
          </CommentsBoxProvider>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default CommentsSheet;
