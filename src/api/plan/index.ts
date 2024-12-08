import { api } from "../api";


export const getPlanByPlanId = async (planId : number) => {
    try {
        const response = await api.get(`/plan/${planId}`);
        return response.data.result;
    } catch (error) {
        console.log(error)
    }
  };