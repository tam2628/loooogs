import { getPostById, getPosts } from "@/api/posts";
import PageWrapper from "@/components/PageWrapper";
import PostComments from "@/components/PostComments";
import { playfair } from "@/lib/fonts";
import classNames from "classnames";
import Image from "next/image";

type Params = {
  params: {
    id: string;
  };
};

export default async function Blog({ params: { id } }: Params) {
  const result = await getPostById(id);

  if (result.isErr()) {
    return (
      <PageWrapper>
        <div className="text-center">
          <p className="sm:text-xl md:text-2xl">{result.unwrapErr()}</p>
        </div>
      </PageWrapper>
    );
  }

  const post = result.unwrap();

  return (
    <PageWrapper>
      <main className="mb-12">
        <div className="text-center mb-10">
          <h1 className={classNames("text-5xl", "mb-5", playfair.className)}>
            {post.title}
          </h1>
          <p>by {post.author}</p>
        </div>

        <div className="mb-10">
          <Image
            src={post.image}
            className="w-full h-auto"
            alt={"post image"}
            width={1920}
            height={1080}
          />
        </div>

        <p>{post.body}</p>
      </main>

      <section>
        <p className={classNames("text-2xl", playfair.className)}>
          Leave your comment
        </p>
        <hr className="mb-5" />
        <PostComments postId={post.id} />
      </section>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  const result = await getPosts();

  return result.unwrap().result.map((post) => ({
    id: post.id.toString(),
  }));
}
