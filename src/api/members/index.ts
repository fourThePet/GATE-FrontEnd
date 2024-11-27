import { PostUsersCheckNicknameBody, UserInfoForm } from "../../interfaces/user";
import { api } from "../api";

export const postMembersCheckNickname = async (body : PostUsersCheckNicknameBody) =>{
    const response = await api.post('/members/check-nickname', body)
    return response.data
}

export const postMembersSignup = async (body : UserInfoForm ) => {
    const response = await api.post('/members/signup', body)
    return response.data
}
