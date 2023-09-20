import { postRepository } from "../repositories/post_repository";
import { PaginationParams } from "../types/params/paginationParams";
import { PostData } from "../types/postData";

export const postFactory = () => {
    const repository = postRepository;
    return {
      get: async (paginationData: PaginationParams): Promise<PostData[]> => {
        const response = await repository.getPosts(paginationData);
        return response;
      },
      post: async (postContent: string) => {
        await repository.createPosts(postContent);
      }
    }
  };