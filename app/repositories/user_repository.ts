import { apiRequest } from "../axios/axiosInstance";
import { createAccountParams } from "../types/params/createAccountParams";
import { editUserDataParams } from "../types/params/editUserDataParams";
import { editUserIconParams } from "../types/params/editUserIconParams";
import { loginAccountParams } from "../types/params/loginAccountParams";
import { responseAccountData } from "../types/response/responseAccountData";
import { responseUserData } from "../types/response/responseUserData";

export type UserRepository = {
    loginAccount: (loginInfo : loginAccountParams) => Promise<responseUserData>;
    createAccount: (accountInfo: createAccountParams) => Promise<responseAccountData>;
    getUserData: () => Promise<responseUserData>;
    editUserData: (editUserInfo: editUserDataParams) => Promise<void>;
    editUserIcon: (editIconInfo: editUserIconParams) => Promise<void>;
}

const loginAccount: UserRepository["loginAccount"] = async (loginInfo: loginAccountParams): Promise<responseUserData> => {
    const response = await apiRequest.post('/auth', {
        email: loginInfo.email,
        password: loginInfo.password
    });
    return response;
}

const getUserData: UserRepository["getUserData"] = async (): Promise<responseUserData> => {
    const response = await apiRequest.get('/account');
    return response;
}

const createAccount: UserRepository["createAccount"] = async (accountInfo: createAccountParams): Promise<responseAccountData> => {
    const response = await apiRequest.post('/account', {
        name: accountInfo.name,
        email: accountInfo.email,
        password: accountInfo.password,
    });
    return response.data;
}

const editUserData: UserRepository["editUserData"] = async (editUserInfo: editUserDataParams) => {
    await apiRequest.patch('/account/profile', {
        name: editUserInfo.name,
        email: editUserInfo.email
    });
}

const editUserIcon: UserRepository["editUserIcon"] = async (editIconInfo: editUserIconParams) => {
    await apiRequest.patch('/account/icon_image', editIconInfo.newIcon, {
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