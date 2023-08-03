import { UserData } from '@/app/types/types';
import { atom } from 'recoil';

export const userDataState = atom<UserData | null>({
    key: "userDataState",
    default: null,
})