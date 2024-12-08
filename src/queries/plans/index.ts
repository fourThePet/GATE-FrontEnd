import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlans, postCreatePlan } from "../../api/plans";
import { QUERY_KEYS } from "../query-keys";
import { useInfiniteQuery } from "react-query";

// 일정 리스트 조회 훅
export const useGetPlans = (
  dateFilter: "AFTER" | "BEFORE",
  sortOrder: "ASC" | "DESC"
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.GET_PLANS(dateFilter, sortOrder, 0, 10), // 초기 값으로 page=0, size=10 전달
    queryFn: ({ pageParam = 0 }) =>
      getPlans(dateFilter, sortOrder, pageParam, 10), // 페이지 정보는 pageParam에서 처리
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === 10) {
        return allPages.length; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지 없음
    },
  });
};

// 일정 생성 훅
export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEYS.CREATE_PLAN,
    mutationFn: async (body: {
      date: string;
      cityId: number;
      dogIds: number[];
      placeIds: number[];
    }) => {
      try {
        return await postCreatePlan(body); // 여기서 postCreatePlan 사용
      } catch (error) {
        throw new Error("일정을 생성하는 데 실패했습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === QUERY_KEYS.GET_PLANS("AFTER", "ASC", 0, 10)[0],
      });
    },
  });
};
