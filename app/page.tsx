import { getPosts } from "@/api/posts";
import PostItems from "@/components/PostItems";
import { use } from "react";

export default function Home() {
  const paginatedPostsResponse = use(getPosts(1));

  return (
    <PostItems
      posts={paginatedPostsResponse.result}
      page={paginatedPostsResponse.page}
      total={paginatedPostsResponse.total}
    />
  );
}
