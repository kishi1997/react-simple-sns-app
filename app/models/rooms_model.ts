import { roomsRepository } from "../repositories/rooms_repository";
import { chatData } from "../types/chatData";
import { roomUser } from "../types/response/responseRoomData";

export const roomsFactory = () => {
    const repository = roomsRepository;
    return {
        getChatList: async():Promise<chatData[]> => {
            const response = await repository.getChatList();
            return response;
        },
        getRoomData: async(roomId:string):Promise<roomUser[]> => {
            const response = await repository.getRoomData(roomId);
            return response;
        }
    }
};