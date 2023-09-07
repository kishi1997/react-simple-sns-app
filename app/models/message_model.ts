import { messageRepository } from "../repositories/message_repository";
import { commentDataParams } from "../types/params/commentDataParams";

export const messageFactory = () => {
    const repository = messageRepository;
    return {
        addComment: async(params: commentDataParams) => {
            await repository.addComment(params);
        }
    }
};