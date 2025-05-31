import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  password: string
}

interface UserStore {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null })
}))