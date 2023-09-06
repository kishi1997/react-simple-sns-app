import { userData } from "../userData";

export type responseUserData = {
    data: {
        user: userData;
        token: string;
    }
}