import { create } from "zustand";

interface AppState {
  data: Record<string, any>;

  setField: (key: string, value: any) => void;
}

const useStore = create<AppState>((set) => ({
  data: {},

  setField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),
}));

export default useStore;