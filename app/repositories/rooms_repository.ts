import { apiRequest } from "../axios/axiosInstance";
import { ChatData } from "../types/chatData";
import { ResponseRoomUserData } from "../types/response/responseRoomUserData";

export type RoomsRepository = {
 getChatList:() => Promise<ChatData[]>;
 getRoomData:(roomId: string) => Promise<ResponseRoomUserData[]>;
}

const getChatList:RoomsRepository["getChatList"] = async():Promise<ChatData[]> => {
    const response = await apiRequest.get('/rooms');
    return response.data.rooms;
}
const getRoomData:RoomsRepository["getRoomData"] = async(roomId: string):Promise<ResponseRoomUserData[]> => {
    const response = await apiRequest.get(`/rooms/${roomId}`);
    return response.data.room.roomUsers;
}

export const roomsRepository: RoomsRepository = {
    getChatList,
    getRoomData
}