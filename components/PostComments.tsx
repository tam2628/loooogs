import { getCommentsByPostId } from "@/api/posts";
import { use } from "react";
import PostCommentItems from "./PostCommentItems";

type PostCommentsProps = {
  postId: number;
};

export default function PostComments({ postId }: PostCommentsProps) {
  const comments = use(getCommentsByPostId(postId));

  console.log(comments);

  return <PostCommentItems postId={postId} comments={comments} />;
}
