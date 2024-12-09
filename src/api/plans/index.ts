import { PlansApiResponse } from "./../../interfaces/plans/index";
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

// 일정 생성 API
export const postCreatePlan = async (body: {
  date: string;
  cityId: number;
  dogIds: number[];
  placeIds: number[];
}) => {
  const response = await api.post("/plans", body);
  return response.data.result;
};

export const getPlanByPlanId = async (planId: number) => {
  try {
    const response = await api.get(`/plan/${planId}`);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
