import { apiRequest } from "../axios/axiosInstance";
import { chatRoomData } from "../types/chatRoomData";
import { commentDataParams } from "../types/params/commentDataParams";
import { paginationParams } from "../types/params/paginationParams";
import { sendChatDataParams } from "../types/params/sendChatDataParams";

export type MessageRepository = {
    addComment: (commentData: commentDataParams) => Promise<void>;
    getChat: (roomId: string, paginationData:paginationParams) => Promise<chatRoomData[]>;
    sendChat: (sendChatData: sendChatDataParams) => Promise<chatRoomData>;
}

const addComment : MessageRepository["addComment"] = async(commentData: commentDataParams) => {
    await apiRequest.post('/messages/via_post', {
      content: commentData.comments[commentData.postId],
      postId: commentData.postId
    })
}

const getChat : MessageRepository["getChat"] = async(roomId: string, paginationData:paginationParams):Promise<chatRoomData[]> => {
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

const sendChat : MessageRepository["sendChat"] = async(sendChatData : sendChatDataParams):Promise<chatRoomData> => {
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