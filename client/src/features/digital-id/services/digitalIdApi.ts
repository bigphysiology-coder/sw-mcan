import { digitalIdApi as api } from '@/api'
import type { DigitalIdRequest } from '@/types'

export const digitalIdApi = {
  async requestDigitalId(data: {
    passportPhoto: string
    signature?: string
    additionalNote?: string
  }): Promise<DigitalIdRequest> {
    return api.request(data)
  },

  async getMyDigitalId(_userId: string): Promise<DigitalIdRequest | undefined> {
    try {
      return await api.getMyId()
    } catch {
      return undefined
    }
  },

  async getAllRequests(): Promise<DigitalIdRequest[]> {
    return api.getAll()
  },

  async approveRequest(id: string, note?: string): Promise<DigitalIdRequest> {
    return api.approve(id, note)
  },

  async rejectRequest(id: string, reason: string): Promise<DigitalIdRequest> {
    return api.reject(id, reason)
  },

  async deleteRequest(id: string): Promise<void> {
    return api.revoke(id, 'Removed by admin')
  },
}
