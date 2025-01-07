import { create } from "zustand";

interface NavState {
  isNavShow: boolean;
  setIsNavShow: () => Promise<boolean>;
}

const useNavStore = create<NavState>((set, get) => ({
  isNavShow: false,
  async setIsNavShow() {
    set((state) => ({ isNavShow: !state.isNavShow }));

    return true;
  },
}));

export default useNavStore;
