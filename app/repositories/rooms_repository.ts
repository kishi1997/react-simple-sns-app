import { apiRequest } from "../axios/axiosInstance";
import { chatData } from "../types/chatData";
import { roomUser } from "../types/response/responseRoomData";

export type RoomsRepository = {
 getChatList:() => Promise<chatData[]>;
 getRoomData:(roomId: string) => Promise<roomUser[]>;
}

const getChatList:RoomsRepository["getChatList"] = async():Promise<chatData[]> => {
    const response = await apiRequest.get('/rooms');
    return response.data.rooms;
}
const getRoomData:RoomsRepository["getRoomData"] = async(roomId: string):Promise<roomUser[]> => {
    const response = await apiRequest.get(`/rooms/${roomId}`);
    return response.data.room.roomUsers;
}

export const roomsRepository: RoomsRepository = {
    getChatList,
    getRoomData
}