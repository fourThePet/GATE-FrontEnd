import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDogsProfileDogId,
  getDogsProfileDogId,
  getDogsProfiles,
  postDogsProfile,
  putDogsProfileDogId,
} from "../../api";
import { QUERY_KEYS } from "../query-keys";
import { useAuthStore } from "../../stores/useAuthStore";

export const usePostDogsProfile = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST_DOGS_PROFILE,
    mutationFn: async (body: FormData) => {
      try {
        return await postDogsProfile(body);
      } catch {
        throw new Error("반려동물 등록에 실패하였습니다.");
      }
    },
  });
};

export const useGetDogsProfiles = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.GET_DOGS_PROFILES,
    queryFn: async () => {
      try {
        return await getDogsProfiles();
      } catch {
        throw new Error("반려견 정보를 가져오는 데 실패했습니다.");
      }
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 (5분)
  });
};

export const useGetDogsProfileDogId = (dogId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_DOGS_PROFILE_DOGID(dogId),
    queryFn: async () => {
      try {
        return await getDogsProfileDogId(dogId);
      } catch {
        throw new Error("반려견 정보를 가져오는 데 실패했습니다.");
      }
    },
  });
};

export const useDeleteDogsProfileDogId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dogId: number) => {
      try {
        return await deleteDogsProfileDogId(dogId);
      } catch {
        throw new Error("반려견 정보를 삭제하는 데 실패했습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_DOGS_PROFILES,
      }); //쿼리를 무효화하여 최신 데이터를 가져옴
    },
  });
};

export const usePutDogsProfileDogId = (dogId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEYS.PUT_DOGS_PROFILE_DOGID(dogId),
    mutationFn: async (body: FormData) => {
      try {
        return await putDogsProfileDogId(body, dogId);
      } catch {
        throw new Error("반려동물 업데이트에 실패하였습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_DOGS_PROFILES,
      });
    },
  });
};
