type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  author: string;
  image: string;
};

type PostComment = {
  id: number;
  body: string;
  postId: number;
  author: string;
  email?: string;
};

type PaginatedResponse<T> = {
  page: number;
  total: number;
  result: T;
};
