import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import {
  getPlacesInfo,
  getPlacesCategories,
  getPlaces_2,
  getPlacesCities,
  getPopularPlaces,
} from "../../api";
import { PlacesParam } from "../../interfaces/places";
// 장소 정보 가져오기 훅
export const useGetPlacesInfo = (placeId: number) => {
  return useQuery({
    queryKey: ["GET_PLACES_INFO", placeId],
    queryFn: async () => {
      return await getPlacesInfo(placeId);
    },
    enabled: !!placeId, // placeId가 있을 때만 호출
  });
};

export const useGetPlacesCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLACES_CATEGORIES,
    queryFn: async () => {
      try {
        return await getPlacesCategories();
      } catch {
        throw new Error("카테고리를 가져오는 데 실패했습니다.");
      }
    },
  });
};

export const useGetPlaces2 = (params: PlacesParam) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLACES(params),
    queryFn: async () => {
      try {
        return await getPlaces_2(params);
      } catch {
        throw new Error("장소 정보를 가져오는 데 실패했습니다.");
      }
    },
  });
};

// 지역 리스트 조회 훅
export const useGetPlacesCities = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLACES_CITIES, // 캐싱 키
    queryFn: async () => {
      try {
        return await getPlacesCities(); // API 호출
      } catch (error) {
        console.error("지역 리스트 조회 중 오류 발생:", error.message);
        throw error; // 에러를 throw하여 React Query가 캐치하도록 함
      }
    },
    staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 (5분)
  });
};

export const useGetPopularPlaces = (limit: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_POPULAR_PLACES(limit),
    queryFn: async () => {
      try {
        return await getPopularPlaces(limit);
      } catch (error) {
        console.error("인기 장소 데이터를 가져오는 중 오류 발생:", error);
        throw new Error("인기 장소 데이터를 가져오는 데 실패했습니다.");
      }
    },
    staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 (5분)
  });
};
