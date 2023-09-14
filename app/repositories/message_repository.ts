import { apiRequest } from "../axios/axiosInstance";
import { chatRoomData } from "../types/chatRoomData";
import { commentDataParams } from "../types/params/commentDataParams";

export type MessageRepository = {
    getChat: (params: string) => Promise<chatRoomData[]>;
    addComment: (params: commentDataParams) => Promise<void>;
}

const addComment : MessageRepository["addComment"] = async(params: commentDataParams) => {
    await apiRequest.post('/messages/via_post', {
      content: params.comments[params.postId],
      postId: params.postId
    })
}

const getChat : MessageRepository["getChat"] = async(params: string):Promise<chatRoomData[]> => {
    const response = await apiRequest.get(`/messages/?roomId=${params}`);
    return response.data.messages;
}

export const messageRepository: MessageRepository = {
    addComment,
    getChat
}