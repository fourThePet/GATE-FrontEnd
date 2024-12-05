import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/useAuthStore";
import { QUERY_KEYS } from "../query-keys";
import { deleteReviews, getReviewsMy } from "../../api";
import { getPlaceReviews } from "../../api/reviews";
import { PlaceReviewResponse } from "../../interfaces/reviews";

export const useGetReviewsMy = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.GET_REVIEWS_MY,
    queryFn: async () => {
      try {
        return await getReviewsMy();
      } catch {
        throw new Error("리뷰 리스트를 가져오는 데 실패했습니다.");
      }
    },
    enabled: isLoggedIn,
  });
};

export const useDeleteReviews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId: number) => {
      try {
        return await deleteReviews(reviewId);
      } catch {
        throw new Error("리뷰를 삭제하는 데 실패했습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_REVIEWS_MY,
      }); //쿼리를 무효화하여 최신 데이터를 가져옴
    },
  });
};

export const useGetPlaceReviews = (placeId: number) => {
  return useQuery<PlaceReviewResponse>({
    queryKey: QUERY_KEYS.GET_PLACE_REVIEWS(placeId),
    queryFn: async () => {
      try {
        return await getPlaceReviews(placeId);
      } catch {
        throw new Error("장소 리뷰를 가져오는 데 실패했습니다.");
      }
    },
    enabled: !!placeId, // placeId가 존재할 때만 요청
  });
};
