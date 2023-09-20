import { UserData } from "./userData";

export type ChatRoomData = {
  id: number;
  content: string;
  createdAt: string;
  user: UserData;
  post: {
      body: string;
  }
}