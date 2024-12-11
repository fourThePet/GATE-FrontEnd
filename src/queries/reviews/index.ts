import { useAuthStore } from "../../stores/useAuthStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlaceReviews,
  getReviewKeywords,
  getReviewsReviewId,
  postCreateReview,
  putReviewByReviewId,
} from "../../api/reviews";
import { QUERY_KEYS } from "../query-keys";
import { deleteReviews, getReviewsMy } from "../../api";
import { PlaceReviewResponse, ReviewKeyword } from "../../interfaces";
import { getReviewSummary } from "../../api/reviews";

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

export const useGetReviewKeywords = (placeId: number) => {
  return useQuery<ReviewKeyword[]>({
    queryKey: QUERY_KEYS.GET_REVIEW_KEYWORDS(placeId),
    queryFn: async () => {
      try {
        return await getReviewKeywords(placeId);
      } catch {
        throw new Error("리뷰 태그를 가져오는 데 실패했습니다.");
      }
    },
    enabled: !!placeId, // placeId가 존재할 때만 요청
  });
};

export const usePostCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.POST_CREATE_REVIEW,
    mutationFn: async (reviewData: FormData) => {
      try {
        return await postCreateReview(reviewData);
      } catch {
        throw new Error("리뷰 작성 중 오류가 발생했습니다.");
      }
    },
    onSuccess: (_, variables) => {
      // FormData에서 placeId 추출
      const placeId = variables.get("placeId") as string;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PLACE_REVIEWS(Number(placeId)),
      });
    },
    onError: (error) => {
      console.error("리뷰 작성 실패:", error);
    },
  });
};

export const useGetReviewsReviewId = (reviewId: number) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.GET_REVIEWS_REVIEWID(reviewId),
    queryFn: async () => {
      try {
        return await getReviewsReviewId(reviewId);
      } catch {
        throw new Error("리뷰를 조회하는 데 실패했습니다.");
      }
    },
    enabled: isLoggedIn,
  });
};

export const usePutReviewByReviewId = (reviewId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: FormData) => {
      try {
        return await putReviewByReviewId(body, reviewId);
      } catch {
        throw new Error("리뷰 수정에 실패하였습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_REVIEWS_MY,
      });
    },
  });
};

export const useGetReviewSummary = (
  placeId: number,
  type: "POSITIVE" | "NEGATIVE" | "OVERALL"
) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_REVIEW_SUMMARY(placeId, type),
    queryFn: async () => {
      try {
        return await getReviewSummary(placeId, type);
      } catch (error) {
        throw new Error("리뷰 요약 조회에 실패했습니다.");
      }
    },
    enabled: !!placeId && !!type, // placeId와 type이 존재할 때만 요청
  });
};
