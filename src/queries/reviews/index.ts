import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/useAuthStore";
import { QUERY_KEYS } from "../query-keys";
import { getReviewsMy } from "../../api/reviews";

export const useGetReviewsMy = () => {
    const {isLoggedIn} = useAuthStore()
    return useQuery({
        queryKey: QUERY_KEYS.GET_REVIEWS_MY,
        queryFn: async () => {
          try {
            return await getReviewsMy();
          } catch {
            throw new Error("리뷰 리스트를 가져오는 데 실패했습니다.");
          }
        },
        enabled : isLoggedIn
    });
}