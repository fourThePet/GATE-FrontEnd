import { api } from "../api";

export const postReviews = async (body: {
  placeId: number;
  receiptCertificate: boolean;
  keywords: { id: number; categoryId: number; content: string }[];
  starRate: number;
  size: string;
  content: string;
}) => {
  try {
    const response = await api.post("/api/v1/reviews", body);
    return response.data;
  } catch (error) {
    console.error("리뷰 작성 중 오류 발생:", error);
    throw error;
  }
};


export const getReviewsMy = async () => {
  const response = await api.get('reviews/my');
  return response.data.result || [];
}