import { postRepository } from "../repositories/post_repository";
import { getPostsParams } from "../types/params/getPostsParams";
import { postData } from "../types/postData";

export const postFactory = () => {
    const repository = postRepository;
    return {
      get: async (query: getPostsParams): Promise<postData[]> => {
        const response = await repository.getPosts(query);
        return response;
      },
      post: async (postContent: string) => {
        await repository.createPosts(postContent);
      }
    }
  };