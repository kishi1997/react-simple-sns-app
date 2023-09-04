import { apiRequest } from "../axios/axiosInstance";
import { getPostsParams } from "../types/params/getPostsParams";
import { postData } from "../types/postData";

export type PostRepository = {
  getPosts: (query: getPostsParams) => Promise<postData[]>;
  createPosts: (postContent: string) => Promise<void>;
}
const getPosts : PostRepository["getPosts"] = async (query: getPostsParams): Promise<postData[]> => {
  const response = await apiRequest.get('/posts', {
    params: {
      Pagination: {
        size: query.size,
        cursor: query.cursor,
        order: "ASC"
      }
    }
  });
  return response.data.posts;
}
const createPosts : PostRepository["createPosts"] = async (postContent: string) => {
  await apiRequest.post('/posts', {
    post: {
      body: postContent,
    }
  });
}

export const postRepository: PostRepository = {
  getPosts,
  createPosts,
}
