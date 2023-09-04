import { apiRequest } from "../axios/axiosInstance";
import { postData } from "../types/postData";

export type Pagination = {
  size: number,
  cursor: number,
}
export type PostRepository = {
  getPosts: (query: Pagination) => Promise<postData[]>;
}
const getPosts = async (query: Pagination): Promise<postData[]> => {
  const response = await apiRequest.get('/posts', {
    params: {
      pagination: {
        size: query.size,
        cursor: query.cursor,
        order: "ASC"
      }
    }
  });
  return response.data.posts;
}

export const postRepository: PostRepository = {
  getPosts,
};