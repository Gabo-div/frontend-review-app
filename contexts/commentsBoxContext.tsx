import { postComment, postAnswer } from "@/services/comments";
import { useToastController } from "@tamagui/toast";
import { createContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface CommentsBoxContextType {
  replyingTo: { commentId: number; username: string } | null;
  setReplyingTo: (id: { commentId: number; username: string } | null) => void;
  addComment: (content: string) => Promise<void>;
  reviewId: number;
}

export const CommentsBoxContext = createContext<CommentsBoxContextType | null>(
  null,
);

interface Props {
  reviewId: number;
  children: React.ReactNode;
}

export const CommentsBoxProvider = ({ reviewId, children }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToastController();

  const [replyingTo, setReplyingTo] = useState<{
    commentId: number;
    username: string;
  } | null>(null);

  const addComment = async (content: string) => {
    if (!content) {
      return;
    }

    if (replyingTo) {
      const { success } = await postAnswer({
        commentId: replyingTo.commentId,
        text: content,
      });

      if (success) {
        toast.show("Respuesta publicada", {
          message: "Tu resuesta ha sido publicada correctamente",
        });
      } else {
        toast.show("Ha ocurrido un error", {
          message: "No hemos podido publicar tu comentario",
          type: "error",
        });
      }

      setReplyingTo(null);
    } else {
      const { success } = await postComment({ text: content, reviewId });

      if (success) {
        toast.show("Comentario publicado", {
          message: "Tu comentario ha sido publicado correctamente",
        });

        queryClient.invalidateQueries({
          queryKey: ["comments", { reviewId }],
        });
      } else {
        toast.show("Ha ocurrido un error", {
          message: "No hemos podido publicar tu comentario",
          type: "error",
        });
      }
    }
  };

  return (
    <CommentsBoxContext.Provider
      value={{
        replyingTo,
        setReplyingTo,
        addComment,
        reviewId,
      }}
    >
      {children}
    </CommentsBoxContext.Provider>
  );
};
