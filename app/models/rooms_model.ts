import { roomsRepository } from "../repositories/rooms_repository";
import { ChatData } from "../types/chatData";
import { ResponseRoomUserData } from "../types/response/responseRoomUserData";

export const roomsFactory = () => {
    const repository = roomsRepository;
    return {
        getChatList: async():Promise<ChatData[]> => {
            const response = await repository.getChatList();
            return response;
        },
        getRoomData: async(roomId:string):Promise<ResponseRoomUserData[]> => {
            const response = await repository.getRoomData(roomId);
            return response;
        }
    }
};