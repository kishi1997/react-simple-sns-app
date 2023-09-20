import { atom } from 'recoil';
import { UserData } from '../../types/userData';

export const userDataState = atom<UserData | null>({
    key: "userDataState",
    default: null,
})