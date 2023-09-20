import { apiRequest } from "../axios/axiosInstance";
import { PaginationParams } from "../types/params/paginationParams";
import { PostData } from "../types/postData";

export type PostRepository = {
  getPosts: (paginationData: PaginationParams) => Promise<PostData[]>;
  createPosts: (postContent: string) => Promise<void>;
}
const getPosts : PostRepository["getPosts"] = async (paginationData: PaginationParams): Promise<PostData[]> => {
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
