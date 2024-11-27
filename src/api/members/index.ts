import { PostUsersCheckNicknameBody } from "../../interfaces/user";
import { api } from "../api";

export const postMembersCheckNickname = async (body : PostUsersCheckNicknameBody) =>{
    const response = await api.post('/members/check-nickname', body)
    return response.data
}

