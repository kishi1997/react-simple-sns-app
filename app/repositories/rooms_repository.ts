import { apiRequest } from "../axios/axiosInstance";
import { chatData } from "../types/chatData";

export type RoomsRepository = {
 getChatList:() => Promise<chatData[]>;
}

const getChatList:RoomsRepository["getChatList"] = async():Promise<chatData[]> => {
    const response = await apiRequest.get('/rooms');
    return response.data.rooms;
}

export const roomsRepository: RoomsRepository = {
    getChatList
}