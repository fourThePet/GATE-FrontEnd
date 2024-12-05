import { create } from "zustand";

interface LocationStore {
  latitude: number | null;
  longitude: number | null;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  latitude: null,
  longitude: null,
  setLatitude: (latitude) => set({ latitude: latitude }),
  setLongitude: (longitude) => set({ longitude: longitude }),
}));
