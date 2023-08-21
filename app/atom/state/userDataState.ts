import { atom } from 'recoil';
import { userData } from '../../types/userData';

export const userDataState = atom<userData | null>({
    key: "userDataState",
    default: null,
})