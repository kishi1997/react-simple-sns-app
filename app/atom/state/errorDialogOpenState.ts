import { atom } from "recoil";

export const errorDialogOpenState = atom<boolean> ({
    key: "errorDialogOpenState",
    default: false
})