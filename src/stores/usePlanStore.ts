import { create } from "zustand";
interface PlanStore{
    date : string;
    cityId : number;
    cityName : string;
    dogIds : number[];
    placeIds : number[];
    setDate: (date: string) => void;
    setCityId: (id: number) => void;
    setCityName: (name: string) => void;
    setDogIds: (id: number) => void;
    setPlaceIds: (id: number) => void;
}

const usePlanStore = create<PlanStore>((set)=>({
    date : "",
    cityId : 0,
    cityName : "",
    dogIds : [],
    placeIds : [],
    
    setDate: (date : string) => set({ date : date }),
    setCityId : (id : number) => set((state)=>({
        cityId : state.cityId === id ? null : id
    })),
    setCityName : (name:string) => set({cityName : name}),
    setDogIds: (id : number) =>
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

}));

export default usePlanStore;