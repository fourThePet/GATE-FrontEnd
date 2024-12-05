import { api, formAPI } from "../api";

// 장소 리뷰 가져오기 API
export const getPlaceReviews = async (placeId: number) => {
  const response = await api.get(`/reviews`, {
    params: { placeId },
  });
  return response.data.result;
};

export const getReviewsMy = async () => {
  const response = await api.get("/reviews/my");
  return response.data.result || [];
};

export const deleteReviews = async (reviewId: number) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};
// 리뷰 태그 가져오기 API
export const getReviewKeywords = async (placeId: number) => {
  const response = await api.get(`/reviews/category`, {
    params: { placeId },
  });
  return response.data.result;
};

// 리뷰 작성 API
export const postCreateReview = async (reviewData: FormData): Promise<any> => {
  try {
    const response = await formAPI.post("/reviews", reviewData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.result;
  } catch (error) {
    throw new Error("리뷰 작성에 실패했습니다.");
  }
};
