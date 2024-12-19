import { create } from "zustand";

interface LocationStore {
  latitude: number;
  longitude: number;
  curLatitude: number;
  curLongitude: number;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setCurLatitude: (curLatitude: number) => void;
  setCurLongitude: (curLongitude: number) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  latitude: 0,
  longitude: 0,
  curLatitude: 0,
  curLongitude: 0,
  setLatitude: (latitude) => set({ latitude }),
  setLongitude: (longitude) => set({ longitude }),
  setCurLatitude: (curLatitude) => set({ curLatitude }),
  setCurLongitude: (curLongitude) => set({ curLongitude }),
}));
