import { promises } from "dns";
import { messageRepository } from "../repositories/message_repository";
import { commentDataParams } from "../types/params/commentDataParams";
import { chatRoomData } from "../types/chatRoomData";

export const messageFactory = () => {
    const repository = messageRepository;
    return {
        addComment: async(params: commentDataParams) => {
            await repository.addComment(params);
        },
        getChat: async(params: string):Promise<chatRoomData[]> => {
            const response = await repository.getChat(params);
            return response;

        }
    }
};