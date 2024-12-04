import { useEffect, useState } from "react";
import { api } from "../api";
import { PlacesParam } from "../../interfaces/places";

// 카테고리 데이터 요청 및 가공
export const getPlacesCategories = async () => {
  try {
    const response = await api.get("/places/categories");
    return response.data;
  } catch (error) {
    throw new Error(error.message || "알 수 없는 오류 발생");
  }
};

// 장소 데이터 요청
export const getPlaces = async (
  latitude: number,
  longitude: number,
  category?: string,
  size?: string,
  entryConditions?: string[],
  types?: string[]
) => {
  try {
    const response = await api.get("/places", {
      params: {
        latitude, // API에 맞는 파라미터 이름 사용
        longitude,
        category,
        size,
        entryConditions: entryConditions?.join(","),
        types: types?.join(","),
      },
    });
    const data = response.data;

    if (data.isSuccess) {
      return data.result;
    } else {
      throw new Error(data.message || "장소 데이터 로드 실패");
    }
  } catch (error) {
    throw new Error(error.message || "알 수 없는 오류 발생");
  }
};

export const getPlaces_2 = async (params: PlacesParam) => {
  const response = await api.get("/places", { params });
  return response.data.result;
};

// 상태관리 훅 (장소 데이터)
export const useGetPlaces = (
  latitude: number,
  longitude: number,
  category?: string,
  size?: string,
  entryConditions?: string[],
  types?: string[]
) => {
  const [places, setPlaces] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    const loadPlaces = async () => {
      setIsLoading(true);
      try {
        const placesData = await getPlaces(
          latitude,
          longitude,
          category,
          size,
          entryConditions,
          types
        );
        setPlaces(placesData);
      } catch (err) {
        setError(err.message || "장소 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaces();
  }, [latitude, longitude, category, size, entryConditions, types]);

  return { places, isLoading, error };
};

export const getPlacesInfo = async (placeId: number) => {
  try {
    const response = await api.get(`/places/${placeId}`);
    return response.data.result; // 필요한 데이터만 반환
  } catch (error) {
    console.error("Error fetching place info:", error);
    throw error;
  }
};
