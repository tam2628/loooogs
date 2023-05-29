import { getCommentsByPostId } from "@/api/posts";
import { use } from "react";
import PostCommentItems from "./PostCommentItems";

type PostCommentsProps = {
  postId: number;
};

export default function PostComments({ postId }: PostCommentsProps) {
  const result = use(getCommentsByPostId(postId));

  if (result.isErr()) {
    return <p>{result.unwrapErr()}</p>;
  }

  const comments = result.unwrap();
  return <PostCommentItems postId={postId} comments={comments} />;
}
