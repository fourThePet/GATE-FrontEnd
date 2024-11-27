import { useMutation } from "@tanstack/react-query";
import { postMembersCheckNickname } from "../../api";
import { PostUsersCheckNicknameBody } from "../../interfaces/user";
import { QUERY_KEYS } from "../query-keys";

export const usePostMembersCheckNickname = () => {
    return useMutation({
        mutationKey : QUERY_KEYS.POST_MEMBERS_CHECKNICKNAME,
        mutationFn: async (body : PostUsersCheckNicknameBody) => {
            try {
                return await postMembersCheckNickname(body);
            }catch{
                throw new Error('정보를 가져오는데 실패했습니다.')
            }
        }
    })
}