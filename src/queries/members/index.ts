import { postMembersCheckNickname } from "../../api";
import { QUERY_KEYS } from "../query-keys";
import { useQuery } from "@tanstack/react-query";

export const usePostMembersCheckNickname = () => {
    return useQuery({
        queryKey : QUERY_KEYS.POST_MEMBERS_CHECKNICKNAME,
        queryFn: async () => {
            try {
                return await postMembersCheckNickname();
            }catch{
                throw new Error('정보를 가져오는데 실패했습니다.')
            }
        }
    })
}