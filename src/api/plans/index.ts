import { PlanRequestBody, PlansApiResponse } from "./../../interfaces/plans/index";
import { api } from "../api";

// 일정 리스트 조회 API
export const getPlans = async (
  dateFilter: "AFTER" | "BEFORE",
  sortOrder: "ASC" | "DESC",
  page: number = 0,
  size: number = 10
): Promise<PlansApiResponse> => {
  const response = await api.get("/plans", {
    params: { dateFilter, sortOrder, page, size },
  });
  return response.data.result;
};


//일정 생성(내 일정으로 담기 버튼 클릭 시 호출)
export const postPlans = async (body: PlanRequestBody) => {
  const response = await api.post("/plans", body);
  return response.data.result;
};

//일정 세부 정보 조회
export const getPlansByPlanId = async (planId: number) => {
  try {
    const response = await api.get(`/plans/${planId}`);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};


//일정 수정
export const putPlansByPlanId = async ({placeIds, date} : {placeIds:number[], date:string}, planId: number) =>{
    const response = await api.put(`/plans/${planId}`, {placeIds, date});
    return response.data;
}

//일정 삭제
export const deletePlansByPlanId = async (planId:number) =>{
  const response = await api.delete(`/plans/${planId}`);
  return response.data;
}

//일정 추천 경로
export const postPlansRoute = async (body: PlanRequestBody)=>{
  const response = await api.post('/plans/route', body);
  return response.data.result;
}


