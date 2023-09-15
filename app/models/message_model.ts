import { messageRepository } from "../repositories/message_repository";
import { commentDataParams } from "../types/params/commentDataParams";
import { chatRoomData } from "../types/chatRoomData";

export const messageFactory = () => {
    const repository = messageRepository;
    return {
        addComment: async(commentData: commentDataParams) => {
            await repository.addComment(commentData);
        },
        getChat: async(roomid: string):Promise<chatRoomData[]> => {
            const response = await repository.getChat(roomid);
            return response;

        }
    }
};