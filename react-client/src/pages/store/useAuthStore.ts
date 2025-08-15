import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserProps = {
  name: string
  id: string
  role: string
  email?: string
} | null

type UserActions = {
  user: UserProps
  isLoggedIn: boolean
  accessToken: string | null
  refreshToken: string | null
  setUser: (user: UserProps) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setAccessToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  resetValues: () => void
}

export const useAuthStore = create<UserActions>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      resetValues: () =>
        set({
          user: null,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
