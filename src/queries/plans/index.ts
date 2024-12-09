import {
  useMutation,
  useQueryClient,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getPlans, postCreatePlan, getPlanByPlanId } from "../../api/plans";
import { QUERY_KEYS } from "../query-keys";
import { PlansApiResponse } from "../../interfaces/plans";
import { useAuthStore } from "../../stores/useAuthStore";

// 일정 리스트 조회 훅
export const useGetPlans = (
  dateFilter: "AFTER" | "BEFORE",
  sortOrder: "ASC" | "DESC"
) => {
  return useInfiniteQuery<PlansApiResponse, Error>({
    queryKey: QUERY_KEYS.GET_PLANS(dateFilter, sortOrder),
    queryFn: async ({ pageParam = 0 }) => {
      // pageParam 기본값 0 설정
      const page = pageParam as number; // 명시적으로 number로 캐스팅
      return await getPlans(dateFilter, sortOrder, page, 10);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      return page + 1 < totalPages ? page + 1 : undefined; // 다음 페이지 반환
    },
    initialPageParam: 0, // 초기 pageParam을 설정
  });
};

// 일정 생성 훅
export const usePostCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.POST_CREATE_PLAN,
    mutationFn: async (body: {
      date: string;
      cityId: number;
      dogIds: number[];
      placeIds: number[];
    }) => {
      try {
        return await postCreatePlan(body);
      } catch (error) {
        throw new Error("일정을 생성하는 데 실패했습니다.");
      }
    },
    onSuccess: () => {
      // 무효화된 쿼리 업데이트
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PLANS("AFTER", "ASC"),
      });
    },
  });
};

export const useGetPlanByPlanId = (planId: number) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLAN_PLANID(planId),
    queryFn: async () => {
      try {
        return await getPlanByPlanId(planId);
      } catch {
        throw new Error("일정 정보를 가져오는 데 실패했습니다.");
      }
    },
    enabled: isLoggedIn,
  });
};
