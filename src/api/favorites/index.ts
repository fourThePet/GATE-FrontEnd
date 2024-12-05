import { api } from "../api";

// 즐겨찾기 리스트 조회 API
export const getFavoritesList = async () => {
  try {
    const response = await api.get("/favorites");
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching favorites list:", error);
    throw error;
  }
};

// 즐겨찾기 등록 API
export const postFavorite = async (placeId : number) => {
  try {
    const response = await api.post("/favorites", { placeId });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

// 즐겨찾기 삭제 API
export const patchFavorite = async (favoriteId : number) => {
  try {
    const response = await api.patch(`/favorites/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};
