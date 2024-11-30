import { useMutation, useQuery } from "@tanstack/react-query";
import { getDogsProfiles, postDogsProfile } from "../../api/dogs";
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

export const useGetDogsProfiles = () => {
    return useQuery({
        queryKey: QUERY_KEYS.GET_DOGS_PROFILES,
        queryFn: async () => {
          try {
            return await getDogsProfiles();
          } catch {
            throw new Error("반려견 정보를 가져오는 데 실패했습니다.");
          }
        }
    });
}