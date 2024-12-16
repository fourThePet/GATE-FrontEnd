import { create } from "zustand";
import { RecommendPlanResponse } from "../interfaces/plans";
import { PET_SIZE } from "../interfaces";

interface PlanStore {
  date: string;
  cityId: number;
  cityName: string;
  dogIds: number[];
  placeIds: number[];
  response: RecommendPlanResponse;
  dogSize: PET_SIZE | null;
  latitude: number | null;
  longitude: number | null;
  setDate: (date: string) => void;
  setCityId: (id: number) => void;
  setCityName: (name: string) => void;
  setDogIds: (id: number) => void;
  setPlaceIds: (id: number) => void;
  setResponse: (response: RecommendPlanResponse) => void;
  resetPlaceIds: () => void;
  setDogSize: (dogSize: PET_SIZE) => void;
  resetState: () => void;
  setCoordinates: (latitude: number, longitude: number) => void;
}

const usePlanStore = create<PlanStore>((set) => ({
  date: "",
  cityId: 0,
  cityName: "",
  dogIds: [],
  placeIds: [],
  response: null,
  dogSize: null,
  latitude: null,
  longitude: null,
  setDate: (date: string) => set({ date: date }),
  setCityId: (id: number) =>
    set((state) => ({
      cityId: state.cityId === id ? null : id,
    })),
  setCityName: (name: string) => set({ cityName: name }),
  setDogIds: (id: number) =>
    set((state) => ({
      dogIds: state.dogIds.includes(id)
        ? state.dogIds.filter((dogId) => dogId !== id) // 이미 있으면 제거
        : [...state.dogIds, id], // 없으면 추가
    })),
  setPlaceIds: (id: number) =>
    set((state) => ({
      placeIds: state.placeIds.includes(id)
        ? state.placeIds.filter((placeId) => placeId !== id) // 포함되어 있으면 제거
        : [...state.placeIds, id], // 포함되지 않으면 추가
    })),
  setResponse: (response: RecommendPlanResponse) => set({ response }), // 응답 객체를 업데이트
  // placeIds 배열을 빈 배열로 리셋하는 메서드
  resetPlaceIds: () => set({ placeIds: [] }),
  setDogSize: (dogSize: PET_SIZE) => set({ dogSize: dogSize }),

  setCoordinates: (latitude: number, longitude: number) =>
    set({ latitude, longitude }),

  // 전체 상태 초기화 메서드
  resetState: () =>
    set({
      date: "",
      cityId: 0,
      cityName: "",
      dogIds: [],
      placeIds: [],
      response: null,
      dogSize: null,
      latitude: null,
      longitude: null,
    }),
}));

export default usePlanStore;
