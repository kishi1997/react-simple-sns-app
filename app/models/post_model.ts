import { Pagination, postRepository } from "../repositories/post_repository";
import { postData } from "../types/postData";

export const postFactory = () => {
    const repository = postRepository;
    return {
      index: async (query: Pagination): Promise<postData[]> => {
        const response = await repository.getPosts(query);
        return response;
      }
    };
  };