import { messageRepository } from "../repositories/message_repository";
import { CommentDataParams } from "../types/params/commentDataParams";
import { ChatRoomData } from "../types/chatRoomData";
import { SendChatDataParams } from "../types/params/sendChatDataParams";
import { PaginationParams } from "../types/params/paginationParams";

export const messageFactory = () => {
    const repository = messageRepository;
    return {
        addComment: async(commentData: CommentDataParams) => {
            await repository.addComment(commentData);
        },
        getChat: async(roomId: string, paginationData: PaginationParams):Promise<ChatRoomData[]> => {
            const response = await repository.getChat(roomId, paginationData);
            return response;
        },
        sendChat: async(sendChatData:SendChatDataParams):Promise<ChatRoomData> => {
            const response = await repository.sendChat(sendChatData);
            return response;
        }

    }
};