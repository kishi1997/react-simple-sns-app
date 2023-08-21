import { atom } from 'recoil';

type userData = {
    id: number,
    name: string,
    email: string,
    iconImageUrl: string
}

export const userDataState = atom<userData | null>({
    key: "userDataState",
    default: null,
})