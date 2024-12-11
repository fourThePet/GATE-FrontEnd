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
export const postCreateReview = async (reviewData: FormData) => {
  try {
    const response = await formAPI.post("/reviews", reviewData);
    return response.data.result;
  } catch {
    throw new Error("리뷰 작성에 실패했습니다.");
  }
};

export const getReviewsReviewId = async (reviewId: number) => {
  try {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data.result;
  } catch (error) {
    console.error(error.response.data.detail);
  }
};

export const putReviewByReviewId = async (body: FormData, reviewId: number) => {
  try {
    const response = await formAPI.put(`/reviews/${reviewId}`, body);
    return response.data;
  } catch (error) {
    console.error(error.response);
  }
};

// 리뷰 요약 조회 API
export const getReviewSummary = async (
  placeId: number,
  type: "POSITIVE" | "NEGATIVE" | "OVERALL"
) => {
  try {
    const response = await api.get(`/reviews/summary/place/${placeId}`, {
      params: { type },
    });
    return response.data.result;
  } catch (error) {
    console.error(
      "리뷰 요약 조회 실패:",
      error.response?.data?.message || error.message
    );
    throw new Error("리뷰 요약 조회에 실패했습니다.");
  }
};
