import { atom } from "recoil";

export const flashMessageState = atom<string> ({
    key: "flashMessageState",
    default: ""
})