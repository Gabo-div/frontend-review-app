import { useContext } from "react";
import { CommentsBoxContext } from "@/contexts/commentsBoxContext";

export default function useCommentBox() {
  const context = useContext(CommentsBoxContext);

  if (!context) {
    throw new Error("useCommentBox must be used within a CommentBoxProvider");
  }

  return context;
}
