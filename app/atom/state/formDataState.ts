import {atom} from 'recoil';
import { formData } from '../../types/types'

export const formDataState = atom<formData>({
    key: "formDataState",
    default: {
        name: "",
        email: "",
        password: "",
    },
})