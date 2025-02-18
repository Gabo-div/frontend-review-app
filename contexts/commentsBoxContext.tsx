import { createContext, useState } from "react";
import { Comment } from "@/models/Comment";
import { useAuthStore } from "@/stores/authStore";

interface CommentsBoxContextType {
  replyingTo: number | null;
  setReplyingTo: (id: number | null) => void;
  comments: Comment[];
  addComment: (content: string) => void;
}

export const CommentsBoxContext = createContext<CommentsBoxContextType | null>(
  null,
);

interface Props {
  reviewId: number;
  children: React.ReactNode;
}

export const CommentsBoxProvider = ({ reviewId, children }: Props) => {
  const session = useAuthStore((state) => state.session!);

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  // TODO: Get comments from API

  const addComment = (content: string) => {
    if (replyingTo) {
      // TODO: Add reply to comment
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          reviewId,
          userId: session.user_id,
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      setReplyingTo(null);
    } else {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          reviewId,
          userId: session.user_id,
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  };

  return (
    <CommentsBoxContext.Provider
      value={{
        replyingTo,
        setReplyingTo,
        comments,
        addComment,
      }}
    >
      {children}
    </CommentsBoxContext.Provider>
  );
};
