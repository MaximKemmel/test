import { create } from 'zustand'

interface toggleState {
    isOpen: boolean
    open: () => void
    close: () => void
}

interface toggleState2 {
    isOpen: boolean
    level: string | null
    price: string | null
    open: (level: string, price: string) => void
    close: () => void
}

export const usePopupRegistration = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupAuto = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupConnect = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupConnect2 = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupParentFilterStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupStatisticFilterStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupTargetStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupAvatarStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupTelegramStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export const usePopupTimerStore = create<toggleState2>((set) => ({
    isOpen: false,
    level: null,
    price: null,
    open: (level: string, price: string) => set({ isOpen: true, level, price }),
    close: () => set({ isOpen: false }),
}));
