import {atom} from 'recoil'

export const errorState = atom<string>({
    key: "errorState",
    default: ""
})

export const errorDialogOpenState = atom<boolean>({
    key: "errorDialogOpenState",
    default: false
})