import { create } from 'zustand'
import type { User } from '@/types'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/constants'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

function loadPersistedUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function getPersistedToken(): string | null {
  const t = localStorage.getItem(AUTH_TOKEN_KEY)
  return t && t !== 'undefined' ? t : null
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadPersistedUser(),
  token: getPersistedToken(),
  isAuthenticated: !!getPersistedToken(),
  setAuth: (user, token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    set({ user: null, token: null, isAuthenticated: false })
  },
  updateUser: (partial) =>
    set((s) => {
      if (!s.user) return s
      const updated = { ...s.user, ...partial }
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated))
      return { user: updated }
    }),
}))
