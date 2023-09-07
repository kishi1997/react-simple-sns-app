import { roomsRepository } from "../repositories/rooms_repository";
import { chatData } from "../types/chatData";

export const roomsFactory = () => {
    const repository = roomsRepository;
    return {
        getChatList: async():Promise<chatData[]> => {
            const response = await repository.getChatList();
            return response;
        }
    }
};