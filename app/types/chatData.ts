import { UserData } from "./userData";

type Message = {
  content: string;
  createdAt: string;
}
export type RoomUser = {
  roomId: string;
  user: UserData;
  userId: number
}

export type ChatData = {
  id: string;
  messages: Message[];
  roomUsers: RoomUser[];
}