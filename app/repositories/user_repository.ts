import { apiRequest } from "../axios/axiosInstance";
import { createAccountParams } from "../types/params/createAccountParams";
import { editUserDataParams } from "../types/params/editUserDataParams";
import { editUserIconParams } from "../types/params/editUserIconParams";
import { loginAccountParams } from "../types/params/loginAccountParams";
import { responseAccountData } from "../types/response/responseAccountData";
import { responseUserData } from "../types/response/responseUserData";

export type UserRepository = {
    loginAccount: (params: loginAccountParams) => Promise<responseUserData>;
    createAccount: (params: createAccountParams) => Promise<responseAccountData>;
    getUserData: () => Promise<responseUserData>;
    editUserData: (params: editUserDataParams) => Promise<void>;
    editUserIcon: (params: editUserIconParams) => Promise<void>;
}

const loginAccount: UserRepository["loginAccount"] = async (params: loginAccountParams): Promise<responseUserData> => {
    const response = await apiRequest.post('/auth', {
        email: params.email,
        password: params.password
    });
    return response;
}

const getUserData: UserRepository["getUserData"] = async (): Promise<responseUserData> => {
    const response = await apiRequest.get('/account');
    return response;
}

const createAccount: UserRepository["createAccount"] = async (params: createAccountParams): Promise<responseAccountData> => {
    const response = await apiRequest.post('/account', {
        name: params.name,
        email: params.email,
        password: params.password,
    });
    return response.data;
}

const editUserData: UserRepository["editUserData"] = async (params: editUserDataParams) => {
    await apiRequest.patch('/account/profile', {
        name: params.name,
        email: params.email
    });
}

const editUserIcon: UserRepository["editUserIcon"] = async (params: editUserIconParams) => {
    await apiRequest.patch('/account/icon_image', params.newIcon, {
        headers: {
            "content-type": "multipart/form-data"
        }
    })
}

export const userRepository: UserRepository = {
    loginAccount,
    getUserData,
    createAccount,
    editUserData,
    editUserIcon
}