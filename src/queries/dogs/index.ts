import { useMutation } from "@tanstack/react-query";
import { postDogsProfile } from "../../api/dogs";
import { QUERY_KEYS } from "../query-keys";

export const usePostDogsProfile = () => {
    return useMutation({
        mutationKey : QUERY_KEYS.POST_DOGS_PROFILE,
        mutationFn: async (body : FormData) => {
            try {
                return await postDogsProfile(body);
            }catch{
                throw new Error('반려동물 등록에 실패하였습니다.')
            }
        }
    })
}