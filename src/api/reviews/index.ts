import { api } from "../api";

export const getPlaceReviews = async (placeId: number) => {
  const response = await api.get(`/reviews`, {
    params: { placeId },
  });
  return response.data.result;
};


export const getReviewsMy = async () => {
  const response = await api.get('/reviews/my');
  return response.data.result || [];
}

export const deleteReviews = async(reviewId : number)=>{
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
}