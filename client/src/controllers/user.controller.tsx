import { AxiosError } from "axios";
import { string } from "joi";
import clientReq from "../utils/api";

export interface IUserData {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}

class UserController {
    static login = async (data: Pick<IUserData, "email" | "password">) => {
        try {
            const response = await clientReq.post('/user/login', data);
            return response.data;
        } catch (error) { 
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    static register = async (data: IUserData) => {
        try {
            const response = await clientReq.post('/user/register', data);
            return response.data;
        } catch (error) { 
            const err = error as AxiosError;
            console.log(err.message);
        }
    }
}


export default UserController;
