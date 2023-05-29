"use client";

import { getPosts, searchPosts } from "@/api/posts";
import { playfair } from "@/lib/fonts";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";
import { Input } from "./Input";
import SearchInput from "./SearchInput";
import { useSearchParams } from "next/navigation";
import SearchInputWrapper from "./SearchInputWrapper";

type PostItemsProps = {
  posts: Post[];
  total: number;
  page: number;
};

export default function PostItems({ posts, total, page }: PostItemsProps) {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [_posts, setPosts] = useState<Post[]>(posts);
  const lastPage = total / 10 + (total % 10 ? 1 : 0);
  const search = useSearchParams().get("q");
  const [_, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setFetching(true);
    if (!search) {
      (async () => {
        setPosts((await getPosts(1)).result);
        setCurrentPage(1);
        setFetching(false);
      })();

      return;
    }

    (async () => {
      const x = await searchPosts(search);

      setPosts(x);
      setFetching(false);
    })();
  }, [search]);

  useEffect(() => {
    if (!currentPage) return;
    setHasMore(currentPage !== lastPage);
  }, [currentPage]);

  async function loadMorePosts() {
    const posts = (await getPosts(currentPage + 1)).result;
    setTimeout(() => {
      setPosts([..._posts, ...posts]);
      setCurrentPage((currentPage) => currentPage + 1);
    }, 1000);
  }

  if (!_posts.length && search !== "") {
    return (
      <PageWrapper>
        <SearchInputWrapper />
        <p className="text-xl">No posts found for the term {search}</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <SearchInputWrapper />

      {!search && !!_posts.length && (
        <InfiniteScroll
          hasMore={hasMore}
          next={loadMorePosts}
          loader={
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                repeat: Infinity,
                repeatDelay: 0.7,
                ease: "easeInOut",
              }}
              className="p-5 text-center"
            >
              <span className="text-bold">loading more posts...</span>
            </motion.div>
          }
          dataLength={_posts.length}
        >
          <PostList posts={_posts} />
        </InfiniteScroll>
      )}

      {search && <PostList posts={_posts} />}
    </PageWrapper>
  );
}

function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 p-2">
      {posts.map((post, key) => (
        <li key={key} className="mb-10 ">
          <motion.div
            whileHover={{
              boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.39)",
              transition: { duration: 0.1 },
            }}
            className="rounded overflow-hidden"
          >
            <Link href={`/blog/${post.id.toString()}`}>
              <div>
                <Image
                  src={post.image}
                  width={1920}
                  height={1080}
                  alt={"Blog image"}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6">
                <span className="block mb-3 font-bold text-sm">
                  {post.author}
                </span>
                <h1
                  className={classNames("text-xl", "mb-1", playfair.className)}
                >
                  {post.title}
                </h1>
                <p className="mb-3 text-slate-600 text-sm">
                  {post.body.slice(0, 100)}...
                </p>
              </div>
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
