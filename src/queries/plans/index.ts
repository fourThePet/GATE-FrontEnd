import {
  useMutation,
  useQueryClient,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getPlans, deletePlansByPlanId, putPlansByPlanId, getPlansByPlanId, postPlans, postPlansRoute } from "../../api";
import { QUERY_KEYS } from "../query-keys";
import { PlanRequestBody, PlansApiResponse } from "../../interfaces";
import { useAuthStore } from "../../stores/useAuthStore";

// 일정 리스트 조회 훅
export const useGetPlans = (
  dateFilter: "AFTER" | "BEFORE",
  sortOrder: "ASC" | "DESC"
) => {
  const { isLoggedIn } = useAuthStore();

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
    enabled: isLoggedIn,
  });
};

// 일정 생성 훅
export const usePostPlans = () => {
  
  return useMutation({
    mutationKey: QUERY_KEYS.POST_PLANS,
    mutationFn: async (body: PlanRequestBody) => {
      try {
        return await postPlans(body);
      } catch{
        throw new Error("내 일정 담기 실패했습니다.");
      }
    },
  });
};

export const useGetPlansByPlanId = (planId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLANS_PLANID(planId),
    queryFn: async () => {
      try {
        return await getPlansByPlanId(planId);
      } catch {
        throw new Error("일정 정보를 가져오는 데 실패했습니다.");
      }
    },
  });
};

export const useDeletePlansByPlanId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (planId: number) => {
      try {
        return await deletePlansByPlanId(planId);
      } catch {
        throw new Error("일정을 삭제하는 데 실패했습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PLANS("AFTER", "ASC"),
      }); //쿼리를 무효화하여 최신 데이터를 가져옴
    },
  });
};

export const usePutPlansByPlanId = (planId : number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({placeIds}:{placeIds:number[]}) => {
      try {
        return await putPlansByPlanId({placeIds}, planId );
      } catch {
        throw new Error("일정 업데이트에 실패하였습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PLANS_PLANID(planId),
      });
    },
  });
};

export const usePostPlansRoute = () => {

  return useMutation({
    mutationKey: QUERY_KEYS.POST_PLANS_ROUTE,
    mutationFn: async (body: PlanRequestBody) => {
      try {
        return await postPlansRoute(body);
      } catch{
        throw new Error("일정을 추천하는데 실패했습니다.");
      }
    },
  });
};
