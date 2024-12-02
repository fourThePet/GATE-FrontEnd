import { api, formAPI } from "../api";

export const postDogsProfile = async (body: FormData) => {
  const response = await formAPI.post("/dogs/profile", body);
  return response.data;
};

export const getDogsProfiles = async () => {
  const response = await api.get("/dogs/profiles");
  return response.data.result;
};

export const getDogsProfileDogId = async (dogId: number) => {
  const response = await api.get(`/dogs/profile/${dogId}`);
  return response.data.result;
};

export const deleteDogsProfileDogId = async (dogId: number) => {
  const response = await api.delete(`/dogs/profile/${dogId}`);
  return response.data;
};
