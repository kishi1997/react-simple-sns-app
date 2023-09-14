import { userData } from "./userData";

export type chatRoomData = {
  content: string;
  createdAt: string;
  user: userData;
  post: {
      body: string;
  }
}