import { UserData } from "./userData";

export type PostData = {
    body: string,
    createdAt: string,
    id: number,
    userId: number,
    user: UserData;
  }