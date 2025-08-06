import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserProps = {
  name: string;
  id: string;
  role: string;
} | null;

type UserActions = {
  user: UserProps;
  isLoggedIn: boolean;
  setUser: (user: UserProps) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  resetValues: () => void;
};

export const useUserStore = create<UserActions>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      resetValues: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "user-storage",
    }
  )
);
