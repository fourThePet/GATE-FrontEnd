import { create, StateCreator } from "zustand";

interface State {
  count: number;
  increment: () => void;
}

const stateCreator: StateCreator<State> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
});

export const useStore = create<State>(stateCreator);
