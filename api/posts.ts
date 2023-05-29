const host = "http://localhost:3001";
export async function getPosts(
  page: number = -1
): Promise<PaginatedResponse<Post[]>> {
  //setting default item per page to be 5
  try {
    // Could have used revalidate here instead of no-cache
    // but that would not show SSR capability

    let url = `${host}/posts`;
    if (page !== -1) {
      url += `?_page=${page}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (response.ok) {
      return {
        page,
        total: Number.parseInt(response.headers.get("X-Total-Count") as string),
        result: await response.json(),
      } as PaginatedResponse<Post[]>;
    }
  } catch (err) {
    // handle error
  }

  return {} as any;
}

export async function getPostById(id: string): Promise<Post> {
  try {
    const response = await fetch(`${host}/posts/${id}`);
    if (response.ok) {
      return (await response.json()) as Post;
    }
  } catch (err) {
    //handle error
  }

  return {} as any;
}

export async function getCommentsByPostId(
  postId: number
): Promise<PostComment[]> {
  try {
    const response = await fetch(`${host}/posts/${postId}/comments`, {
      cache: "no-cache",
    });
    if (response.ok) {
      return (await response.json()) as PostComment[];
    }
  } catch (err) {
    //handle error
  }

  return {} as any;
}

export async function searchPosts(searchTerm: string) {
  try {
    const response = await fetch(`${host}/posts?tags_like=${searchTerm}`);
    if (response.ok) {
      return (await response.json()) as Post[];
    }
  } catch (err) {
    //handle error
  }

  return {} as any;
}
