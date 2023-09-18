import { messageRepository } from "../repositories/message_repository";
import { commentDataParams } from "../types/params/commentDataParams";
import { chatRoomData } from "../types/chatRoomData";
import { sendChatDataParams } from "../types/params/sendChatDataParams";
import { paginationParams } from "../types/params/paginationParams";

export const messageFactory = () => {
    const repository = messageRepository;
    return {
        addComment: async(commentData: commentDataParams) => {
            await repository.addComment(commentData);
        },
        getChat: async(roomId: string, paginationData: paginationParams):Promise<chatRoomData[]> => {
            const response = await repository.getChat(roomId, paginationData);
            return response;
        },
        sendChat: async(sendChatData:sendChatDataParams):Promise<chatRoomData> => {
            const response = await repository.sendChat(sendChatData);
            return response;
        }

    }
};