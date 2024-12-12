import { useEffect, useState, useMemo } from "react";
import { api } from "../api";
import { Place, PlacesParam } from "../../interfaces/places";

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
export const getPlaces = async (params: {
  query?: string;
  latitude: number;
  longitude: number;
  size?: string;
  entryConditions?: string[];
  types?: string[];
  category?: string;
}): Promise<Place[]> => {
  try {
    const response = await api.get("/places", {
      params: {
        query: params.query,
        latitude: params.latitude,
        longitude: params.longitude,
        size: params.size,
        entryConditions: params.entryConditions?.join(","),
        types: params.types?.join(","),
        category: params.category,
      },
    });

    const data = response.data;

    if (data.isSuccess) {
      return data.result;
    } else {
      throw new Error(
        data.message || "장소 데이터를 불러오는 데 실패했습니다."
      );
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "알 수 없는 오류 발생"
    );
  }
};

export const getPlaces_2 = async (params: PlacesParam) => {
  const response = await api.get("/places", { params });
  return response.data.result;
};

// 상태관리 훅 (장소 데이터)
export const useGetPlaces = (params: {
  query?: string;
  latitude: number;
  longitude: number;
  size?: string;
  entryConditions?: string[];
  types?: string[];
  category?: string;
}) => {
  // 메모이제이션된 params 생성
  const memoizedParams = useMemo(
    () => params,
    [
      params.query,
      params.latitude,
      params.longitude,
      params.size,
      params.entryConditions,
      params.types,
      params.category,
    ]
  );

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 위도와 경도가 존재하지 않을 경우 API 호출을 방지
    if (!memoizedParams.latitude || !memoizedParams.longitude) return;

    const loadPlaces = async () => {
      setIsLoading(true);
      try {
        const placesData = await getPlaces(memoizedParams);
        setPlaces(placesData);
      } catch (err: any) {
        setError(err.message || "장소 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaces();
  }, [memoizedParams]); // 메모이제이션된 params에 의존

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

// 지역 리스트 조회 API
export const getPlacesCities = async () => {
  try {
    const response = await api.get("/places/cities");
    const data = response.data;
    if (data.isSuccess) {
      return data.result;
    } else {
      throw new Error(data.message || "지역 리스트 조회에 실패했습니다.");
    }
  } catch (error) {
    throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
  }
};

export const getPopularPlaces = async (limit: number) => {
  try {
    const response = await api.get("/places/popular", {
      params: { limit }, // 인기 장소를 제한하는 파라미터
    });
    const data = response.data;

    if (data.isSuccess) {
      return data.result; // 인기 장소 리스트 반환
    } else {
      throw new Error(
        data.message || "인기 장소 데이터를 불러오는 데 실패했습니다."
      );
    }
  } catch (error) {
    throw new Error(error.message || "알 수 없는 오류 발생");
  }
};
