import { create } from 'zustand'
import {Profile, User} from "@/lib/interfaces";

interface authStore {
    isAuth: boolean
    isLogin: boolean
    auth: () => void
    statusLogin: (val: boolean) => void
    closeAuth: () => void
    setUser: (user: User) => void
    setProfile: (user: Profile) => void
    userInfo: User | null
}

export const useAuthStore = create<authStore>((set) => ({
    isAuth: false,
    isLogin: false,
    userInfo: null,
    auth: () => set({ isAuth: true }),
    statusLogin: (val: boolean) => set({ isLogin: val }),
    closeAuth: () => set({ isAuth: false }),
    setUser: (user: User) => set({ userInfo: user }),
    setProfile: (user: Profile) => {
        set((state => ({ ...state, userInfo: {...state.userInfo as User, Profile: user} })))
    },
}));
