import { apiRequest } from "../axios/axiosInstance";
import { ChatRoomData } from "../types/chatRoomData";
import { CommentDataParams } from "../types/params/commentDataParams";
import { PaginationParams } from "../types/params/paginationParams";
import { SendChatDataParams } from "../types/params/sendChatDataParams";

export type MessageRepository = {
    addComment: (commentData: CommentDataParams) => Promise<void>;
    getChat: (roomId: string, paginationData:PaginationParams) => Promise<ChatRoomData[]>;
    sendChat: (sendChatData: SendChatDataParams) => Promise<ChatRoomData>;
}

const addComment : MessageRepository["addComment"] = async(commentData: CommentDataParams) => {
    await apiRequest.post('/messages/via_post', {
      content: commentData.comments[commentData.postId],
      postId: commentData.postId
    })
}

const getChat : MessageRepository["getChat"] = async(roomId: string, paginationData:PaginationParams):Promise<ChatRoomData[]> => {
    const response = await apiRequest.get(`/messages/?roomId=${roomId}`, {
        params: {
            Pagination: {
              size: paginationData.size,
              cursor: paginationData.cursor,
            }
        }
    });
    return response.data.messages;
}

const sendChat : MessageRepository["sendChat"] = async(sendChatData : SendChatDataParams):Promise<ChatRoomData> => {
    const response = await apiRequest.post('/messages/',{
        content:sendChatData.content,
        roomId:sendChatData.roomId
    });
    return response.data.message;
}

export const messageRepository: MessageRepository = {
    addComment,
    getChat,
    sendChat
}