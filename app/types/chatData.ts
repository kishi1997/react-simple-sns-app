import { UserData } from "./userData";

type Message = {
  content: string;
  createdAt: string;
}
type RoomUser = {
  roomId: string;
  user: UserData;
}

export type ChatData = {
  id: string;
  messages: Message[];
  roomUsers: RoomUser[];
}