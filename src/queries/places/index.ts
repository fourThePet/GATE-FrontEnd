import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { getPlacesInfo } from "../../api/places";

// 장소 정보 가져오기 훅
export const useGetPlacesInfo = (placeId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PLACES_INFO, placeId], // query key에 placeId 추가
    queryFn: async () => {
      try {
        return await getPlacesInfo(placeId);
      } catch (error) {
        console.error("장소 정보를 가져오는 중 오류 발생:", error);
        throw new Error("장소 정보를 가져오는 데 실패했습니다.");
      }
    },
  });
};
