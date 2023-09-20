import { userData } from "./userData";

export type chatRoomData = {
  id: number;
  content: string;
  createdAt: string;
  user: userData;
  post: {
      body: string;
  }
}