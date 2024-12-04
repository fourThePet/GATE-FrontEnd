import { useMutation } from "@tanstack/react-query";
import { postFavorite, patchFavorite } from "../../api/favorites";

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
