import { useMutation, useQuery } from "@tanstack/react-query";
import { getMembersInfo, postMembersCheckNickname, postMembersLogout, postMembersSignup } from "../../api";
import { PostUsersCheckNicknameBody, UserInfoForm } from "../../interfaces";
import { QUERY_KEYS } from "../query-keys";
import { useAuthStore } from "../../stores/useAuthStore";
import { notify } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export const usePostMembersCheckNickname = () => {
    return useMutation({
        mutationKey : QUERY_KEYS.POST_MEMBERS_CHECKNICKNAME,
        mutationFn: async (body : PostUsersCheckNicknameBody) => {
            try {
                return await postMembersCheckNickname(body);
            }catch{
                throw new Error('닉네임 중복체크를 실패하였습니다.')
            }
        }
    })
}

export const usePostMembersSignup = () => {
    return useMutation({
        mutationKey : QUERY_KEYS.POST_MEMBERS_SIGNUP,
        mutationFn: async (body : UserInfoForm) => {
            try {
                return await postMembersSignup(body);
            }catch{
                throw new Error('회원가입 등록에 실패하였습니다.')
            }
        }
    })
}

export const useGetMembersInfo = () => {
    const {isLoggedIn} = useAuthStore()
    return useQuery({
        queryKey: QUERY_KEYS.GET_MEMBERS_INFO,
        queryFn: async () => {
          try {
            return await getMembersInfo();
          } catch {
            throw new Error("회원 정보를 가져오는 데 실패했습니다.");
          }
        },
        enabled : isLoggedIn
    });
}

export const usePostMembersLogout = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout); 
    return useMutation({
        mutationFn: async () => {
            try {
                return await postMembersLogout();
            }catch{
                throw new Error('로그아웃 실패하였습니다.')
            }
        },
        onSuccess : () => {
            logout();
            notify({
                type: 'success',
                text: '성공적으로 로그아웃되었습니다.',
            });
            navigate('/'); 
        },
        onError: (error) => {
            // 로그아웃 실패 시 에러 처리
            notify({
              type: 'error',
              text: '로그아웃에 실패했습니다. 다시 시도해주세요.',
            });
            console.error('Logout Error:', error);
        },
    })
    
}