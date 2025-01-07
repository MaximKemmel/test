import { create } from "zustand";
import { SERVER_URI } from "@/core-axios";
import { ResponseOneServer, ResponseServer, Target } from "@/lib/interfaces";

interface TargetsState {
  targets: Target[];
  addTarget: (targets: FormData) => Promise<boolean>;
  editTarget: (id: number, targets: FormData) => Promise<boolean>;
  getTargets: () => Promise<ResponseServer<Target>>;
  getTarget: (id: number) => Promise<ResponseOneServer<Target>>;
}

const useTargetStore = create<TargetsState>((set, get) => ({
  targets: [],
  async addTarget(target: FormData) {
    const response = await fetch(SERVER_URI("users/goals"), {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: target,
    });

    const data = (await response.json()) as ResponseOneServer<Target>;

    set((state) => ({ targets: [...state.targets, data.result] }));

    return true;

    // const todos = [...get().todos, newTodo]
    // set({ todos })
  },
  async editTarget(id: number, targets: FormData) {
    const response = await fetch(SERVER_URI(`users/goals/${id}`), {
      method: "PUT",
      headers: {
        Accept: "multipart/form-data",
      },
      body: targets,
    });

    const data = await response.json();

    set((state) => {
      let oldArray = [...state.targets];

      const idx = oldArray.findIndex((el) => el.id === id);

      oldArray[idx] = data.result;

      return { targets: [...oldArray] };
    });

    return true;

    // const todos = [...get().todos, newTodo]
    // set({ todos })
  },
  async getTargets() {
    const response = await fetch(SERVER_URI("users/goals"), {
      cache: "force-cache",
    });

    //TODO Тестовые данные
    const dataTmp = {
      result: [
        {
          assistent: "Алиса",
          beginDate: "2025-01-01",
          content: "Toyota",
          createdAt: "2024-01-01",
          demand: 100000,
          endDate: "2026-01-01",
          id: 100,
          image: "",
          notyfied: "",
          title: "Купить машину",
          userId: 101,
          value: 1000,
        } as Target,
        {
          assistent: "Алиса",
          beginDate: "2025-01-01",
          content: "Audi",
          createdAt: "2024-01-01",
          demand: 450000,
          endDate: "2026-01-01",
          id: 101,
          image: "",
          notyfied: "",
          title: "Купить машину",
          userId: 101,
          value: 100000,
        } as Target,
        {
          assistent: "Алиса",
          beginDate: "2025-01-01",
          content: "Mercedes",
          createdAt: "2024-01-01",
          demand: 450000,
          endDate: "2026-01-01",
          id: 102,
          image: "",
          notyfied: "",
          title: "Купить машину",
          userId: 101,
          value: 450000,
        } as Target,
        {
          assistent: "Алиса",
          beginDate: "2025-01-01",
          content: "BMW",
          createdAt: "2024-01-01",
          demand: 450000,
          endDate: "2026-01-01",
          id: 103,
          image: "",
          notyfied: "",
          title: "Купить машину",
          userId: 101,
          value: 450000,
        } as Target,
        {
          assistent: "Алиса",
          beginDate: "2025-01-01",
          content: "BMW",
          createdAt: "2024-01-01",
          demand: 450000,
          endDate: "2026-01-01",
          id: 104,
          image: "",
          notyfied: "",
          title: "Купить машину",
          userId: 101,
          value: 458000,
        } as Target,
        {
          assistent: "Алиса",
          beginDate: "2025-01-01",
          content: "BMW",
          createdAt: "2024-01-01",
          demand: 450000,
          endDate: "2026-01-01",
          id: 105,
          image: "",
          notyfied: "",
          title: "Купить машину",
          userId: 101,
          value: 450000,
        } as Target,
      ] as Target[],
    };

    set({ targets: dataTmp.result });
    const data = (await response.json()) as ResponseServer<Target>;

    return data;
  },
  async getTarget(id: number) {
    const response = await fetch(SERVER_URI(`users/goal/${id}`), {
      cache: "force-cache",
    });

    return (await response.json()) as Promise<ResponseOneServer<Target>>;
  },
}));

export default useTargetStore;
