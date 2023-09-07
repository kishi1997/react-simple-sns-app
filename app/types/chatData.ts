import { userData } from "./userData";

type message = {
  content: string;
  createdAt: string;
}
type roomUser = {
  roomId: string;
  user: userData;
}

export type chatData = {
  id: string;
  messages: message[];
  roomUsers: roomUser[];
}