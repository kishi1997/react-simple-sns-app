import { userRepository } from "../repositories/user_repository"
import { createAccountParams } from "../types/params/createAccountParams";
import { editUserDataParams } from "../types/params/editUserDataParams";
import { editUserIconParams } from "../types/params/editUserIconParams";
import { loginAccountParams } from "../types/params/loginAccountParams";
import { responseAccountData } from "../types/response/responseAccountData";
import { responseUserData } from "../types/response/responseUserData";

export const userFactory = () => {
    const repository = userRepository;
    return {
        login: async(loginInfo: loginAccountParams):Promise<responseUserData>=>{
            const response = await repository.loginAccount(loginInfo);
            return response;
        },
        register: async(accountInfo:createAccountParams):Promise<responseAccountData>=>{
            const response = await repository.createAccount(accountInfo);
            return response;
        },
        get: async():Promise<responseUserData> => {
            const response = await repository.getUserData();
            return response;
        },
        editData: async(editUserInfo: editUserDataParams) => {
            await repository.editUserData(editUserInfo);
        },
        editIcon: async(editIconInfo: editUserIconParams) => {
            await repository.editUserIcon(editIconInfo);
        }
    }
}