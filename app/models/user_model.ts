import { userRepository } from "../repositories/user_repository"
import { CreateAccountParams } from "../types/params/createAccountParams";
import { EditUserDataParams } from "../types/params/editUserDataParams";
import { EditUserIconParams } from "../types/params/editUserIconParams";
import { LoginAccountParams } from "../types/params/loginAccountParams";
import { ResponseAccountData } from "../types/response/responseAccountData";
import { ResponseUserData } from "../types/response/responseUserData";

export const userFactory = () => {
    const repository = userRepository;
    return {
        login: async(loginInfo: LoginAccountParams):Promise<ResponseUserData>=>{
            const response = await repository.loginAccount(loginInfo);
            return response;
        },
        register: async(accountInfo:CreateAccountParams):Promise<ResponseAccountData>=>{
            const response = await repository.createAccount(accountInfo);
            return response;
        },
        get: async():Promise<ResponseUserData> => {
            const response = await repository.getUserData();
            return response;
        },
        editData: async(editUserInfo: EditUserDataParams) => {
            await repository.editUserData(editUserInfo);
        },
        editIcon: async(editIconInfo: EditUserIconParams) => {
            await repository.editUserIcon(editIconInfo);
        }
    }
}