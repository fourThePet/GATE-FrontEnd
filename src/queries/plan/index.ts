import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { getPlanByPlanId } from "../../api/plan";
import { useAuthStore } from "../../stores/useAuthStore";

export const useGetPlanByPlanId = (planId : number) => {
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
}