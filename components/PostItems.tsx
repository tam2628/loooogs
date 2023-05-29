"use client";

import { getPosts } from "@/api/posts";
import { playfair } from "@/lib/fonts";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

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

  useEffect(() => {
    if (!currentPage) return;
    setHasMore(currentPage !== lastPage);
  }, [currentPage]);

  async function loadMorePosts() {
    const posts = (await getPosts(currentPage + 1)).result;
    //TODO: change this in the end
    setTimeout(() => {
      setPosts([..._posts, ...posts]);
      setCurrentPage((currentPage) => currentPage + 1);
    }, 1000);
  }

  return (
    <PageWrapper>
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
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 p-2">
          {_posts.map((post, key) => (
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
                      className={classNames(
                        "text-xl",
                        "mb-1",
                        playfair.className
                      )}
                    >
                      {post.title}
                    </h1>
                    <p className="mb-3 text-slate-600 text-sm">
                      {post.body.slice(0, 100)}...
                    </p>
                    {post.tags.map((tag, key) => (
                      <span key={key} className="text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </PageWrapper>
  );
}
