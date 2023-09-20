import { apiRequest } from "../axios/axiosInstance";
import { CreateAccountParams } from "../types/params/createAccountParams";
import { EditUserDataParams } from "../types/params/editUserDataParams";
import { EditUserIconParams } from "../types/params/editUserIconParams";
import { LoginAccountParams } from "../types/params/loginAccountParams";
import { ResponseAccountData } from "../types/response/responseAccountData";
import { ResponseUserData } from "../types/response/responseUserData";

export type UserRepository = {
    loginAccount: (loginInfo : LoginAccountParams) => Promise<ResponseUserData>;
    createAccount: (accountInfo: CreateAccountParams) => Promise<ResponseAccountData>;
    getUserData: () => Promise<ResponseUserData>;
    editUserData: (editUserInfo: EditUserDataParams) => Promise<void>;
    editUserIcon: (editIconInfo: EditUserIconParams) => Promise<void>;
}

const loginAccount: UserRepository["loginAccount"] = async (loginInfo: LoginAccountParams): Promise<ResponseUserData> => {
    const response = await apiRequest.post('/auth', {
        email: loginInfo.email,
        password: loginInfo.password
    });
    return response;
}

const getUserData: UserRepository["getUserData"] = async (): Promise<ResponseUserData> => {
    const response = await apiRequest.get('/account');
    return response;
}

const createAccount: UserRepository["createAccount"] = async (accountInfo: CreateAccountParams): Promise<ResponseAccountData> => {
    const response = await apiRequest.post('/account', {
        name: accountInfo.name,
        email: accountInfo.email,
        password: accountInfo.password,
    });
    return response.data;
}

const editUserData: UserRepository["editUserData"] = async (editUserInfo: EditUserDataParams) => {
    await apiRequest.patch('/account/profile', {
        name: editUserInfo.name,
        email: editUserInfo.email
    });
}

const editUserIcon: UserRepository["editUserIcon"] = async (editIconInfo: EditUserIconParams) => {
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