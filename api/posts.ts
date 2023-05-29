import { Err, Ok, Result } from "@sniptt/monads";

const host = "http://localhost:3001";
export async function getPosts(
  page: number = -1
): Promise<Result<PaginatedResponse<Post[]>, string>> {
  try {
    let url = `${host}/posts`;
    if (page !== -1) {
      url += `?_page=${page}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (response.ok) {
      return Ok({
        page,
        total: Number.parseInt(response.headers.get("X-Total-Count") as string),
        result: await response.json(),
      } as PaginatedResponse<Post[]>);
    }
  } catch (err) {
    return Err("Failed to fetch posts");
  }

  return {} as any;
}

export async function getPostById(id: string): Promise<Result<Post, string>> {
  try {
    const response = await fetch(`${host}/posts/${id}`);
    if (response.ok) {
      const post = (await response.json()) as Post;

      return Ok(post);
    }

    if (response.status === 404) {
      return Err("Post not found");
    }
  } catch (err) {
    return Err("Something went wrong, failed to fetch post");
  }

  return {} as any;
}

export async function getCommentsByPostId(
  postId: number
): Promise<Result<PostComment[], string>> {
  try {
    const response = await fetch(`${host}/posts/${postId}/comments`, {
      cache: "no-cache",
    });
    if (response.ok) {
      const comments = (await response.json()) as PostComment[];
      return Ok(comments);
    }

    if (response.status === 404) {
      return Err("Post not found");
    }
  } catch (err) {
    return Err("Something went wrong, failed to fetch comments");
  }

  return {} as any;
}

export async function searchPosts(
  searchTerm: string
): Promise<Result<Post[], string>> {
  try {
    const response = await fetch(`${host}/posts?tags_like=${searchTerm}`);
    if (response.ok) {
      const posts = (await response.json()) as Post[];
      return Ok(posts);
    }
  } catch (err) {
    return Err("Something went wrong, failed to fetch posts");
  }

  return {} as any;
}
