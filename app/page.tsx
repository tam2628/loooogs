import { getPosts } from "@/api/posts";
import PostItems from "@/components/PostItems";
import { use } from "react";

export default function Home() {
  const result = use(getPosts(1));

  if (result.isErr()) {
    return (
      <div className="text-center">
        <p className="sm:text-xl md:text-2xl">{result.unwrapErr()}</p>
      </div>
    );
  }

  const paginatedPosts = result.unwrap();

  return (
    <PostItems
      posts={paginatedPosts.result}
      page={paginatedPosts.page}
      total={paginatedPosts.total}
    />
  );
}
