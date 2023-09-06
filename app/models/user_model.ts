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
        login: async(params: loginAccountParams):Promise<responseUserData>=>{
            const response = await repository.loginAccount(params);
            return response;
        },
        register: async(params:createAccountParams):Promise<responseAccountData>=>{
            const response = await repository.createAccount(params);
            return response;
        },
        get: async():Promise<responseUserData> => {
            const response = await repository.getUserData();
            return response;
        },
        editData: async(params: editUserDataParams) => {
            await repository.editUserData(params);
        },
        editIcon: async(params: editUserIconParams) => {
            await repository.editUserIcon(params);
        }
    }
}