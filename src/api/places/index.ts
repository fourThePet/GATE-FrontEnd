import { api } from "../api";

export const getPlacesInfo = async (placeId) => {
  try {
    const response = await api.get(`/places/${placeId}`);
    return response.data.result; // 필요한 데이터만 반환
  } catch (error) {
    console.error("Error fetching place info:", error);
    throw error;
  }
};
