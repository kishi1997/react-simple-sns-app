import { postRepository } from "../repositories/post_repository";
import { paginationParams } from "../types/params/paginationParams";
import { postData } from "../types/postData";

export const postFactory = () => {
    const repository = postRepository;
    return {
      get: async (paginationData: paginationParams): Promise<postData[]> => {
        const response = await repository.getPosts(paginationData);
        return response;
      },
      post: async (postContent: string) => {
        await repository.createPosts(postContent);
      }
    }
  };