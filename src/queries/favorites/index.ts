import { useMutation, useQuery } from "@tanstack/react-query";
import { getFavoritesList, patchFavorite, postFavorite } from "../../api";
import { useAuthStore } from "../../stores/useAuthStore";
import { QUERY_KEYS } from "../query-keys";

export const usePostFavorite = () => {
  return useMutation({
    mutationFn: async (placeId: number) => {
      return await postFavorite(placeId);
    },
  });
};

export const usePatchFavorite = () => {
  return useMutation({
    mutationFn: async (favoriteId: number) => {
      return await patchFavorite(favoriteId);
    },
  });
};

export const useGetFavoritesList = () => {
    const {isLoggedIn} = useAuthStore()
    return useQuery({
        queryKey: QUERY_KEYS.GET_FAVORITES_LIST,
        queryFn: async () => {
          try {
            return await getFavoritesList();
          } catch {
            throw new Error("즐겨찾기 내역을 가져오는 데 실패했습니다.");
          }
        },
        enabled : isLoggedIn
    });
}
