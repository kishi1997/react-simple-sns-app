import { apiRequest } from "../axios/axiosInstance";
import { chatRoomData } from "../types/chatRoomData";
import { commentDataParams } from "../types/params/commentDataParams";

export type MessageRepository = {
    getChat: (roomId: string) => Promise<chatRoomData[]>;
    addComment: (commentData: commentDataParams) => Promise<void>;
}

const addComment : MessageRepository["addComment"] = async(commentData: commentDataParams) => {
    await apiRequest.post('/messages/via_post', {
      content: commentData.comments[commentData.postId],
      postId: commentData.postId
    })
}

const getChat : MessageRepository["getChat"] = async(roomId: string):Promise<chatRoomData[]> => {
    const response = await apiRequest.get(`/messages/?roomId=${roomId}`);
    return response.data.messages;
}

export const messageRepository: MessageRepository = {
    addComment,
    getChat
}