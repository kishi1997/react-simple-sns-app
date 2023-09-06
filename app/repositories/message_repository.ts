import { apiRequest } from "../axios/axiosInstance";
import { commentDataParams } from "../types/params/commentDataParams";

export type MessageRepository = {
    addComment: (params: commentDataParams) => Promise<void>;
}

const addComment : MessageRepository["addComment"] = async(params: commentDataParams) => {
    await apiRequest.post('/messages/via_post', {
      content: params.comments[params.postId],
      postId: params.postId
    })
}

export const messageRepository: MessageRepository = {
    addComment
}