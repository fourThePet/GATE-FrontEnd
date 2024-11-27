import { api } from "../api";

export const postMembersCheckNickname = async () =>{
    const response = await api.post('/members/check-nickname')
    return response.data
}

