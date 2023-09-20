import { UserData } from "../userData";

export type ResponseUserData = {
    data: {
        user: UserData;
        token: string;
    }
}