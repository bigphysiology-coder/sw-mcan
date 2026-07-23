import { authApi as api } from '@/api'
import type { User, AuthResponse, LoginPayload, RegisterPayload } from '@/types'

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await api.login(payload)
    return { user: res.user, accessToken: res.accessToken }
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await api.register(payload)
    return { user: res.user, accessToken: res.accessToken }
  },

  async logout(): Promise<void> {
    await api.logout()
  },

  async getMe(): Promise<User> {
    return api.getMe()
  },

  async changePassword(data: { currentPassword: string; newPassword: string; confirmNewPassword: string }): Promise<void> {
    return api.changePassword(data)
  },

  getAllUsers(): never {
    throw new Error('getAllUsers removed — use adminUsersApi from @/api')
  },
}
