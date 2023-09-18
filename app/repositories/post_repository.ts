import { apiRequest } from "../axios/axiosInstance";
import { paginationParams } from "../types/params/paginationParams";
import { postData } from "../types/postData";

export type PostRepository = {
  getPosts: (paginationData: paginationParams) => Promise<postData[]>;
  createPosts: (postContent: string) => Promise<void>;
}
const getPosts : PostRepository["getPosts"] = async (paginationData: paginationParams): Promise<postData[]> => {
  const response = await apiRequest.get('/posts', {
    params: {
      Pagination: {
        size: paginationData.size,
        cursor: paginationData.cursor,
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
