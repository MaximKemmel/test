import { create } from "zustand";

interface MatrixState {
  currentMatrix: number;
  setCurrentMatrix: (matrix: number) => Promise<boolean>;
}

const useMatrixStore = create<MatrixState>((set, get) => ({
  currentMatrix: 0,
  async setCurrentMatrix(matrix: number) {
    set((state) => ({ currentMatrix: matrix }));

    return true;
  },
}));

export default useMatrixStore;
