"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";

type PostCommentItemsProps = {
  postId: number;
  comments: PostComment[];
};

export default function PostCommentItems({
  postId,
  comments,
}: PostCommentItemsProps) {
  const userComments = useSelector(
    (state: RootState) => state.comments.comments
  ).filter((comment) => comment.postId === postId);

  const hasComments = !!userComments.length || !!comments.length;

  return (
    <>
      <div className="mb-8 sm:w-full lg:w-3/5">
        <CommentForm postId={postId} />
      </div>

      {!hasComments && <p>No comments so far.</p>}

      {hasComments &&
        [...userComments, ...comments].map((comment, key) => (
          <div key={`comment-${key}`} className="mb-2">
            <div>
              <p className="font-bold">{comment.author}</p>
              <p>{comment.body}</p>
            </div>
          </div>
        ))}
    </>
  );
}
