import { api } from "../api";

// 카테고리 데이터 요청 및 가공
export const getPlanByPlanId = async (planId : number) => {
    try {
        const response = await api.get(`/plan/${planId}`);
        return response.data.result;
    } catch (error) {
        console.log(error)
    }
  };