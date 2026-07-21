import { lodgesApi as api } from '@/api'
import type { Lodge } from '@/types'

export const lodgesApi = {
  async getLodges(): Promise<Lodge[]> {
    return api.getAll()
  },

  async createLodge(data: Omit<Lodge, 'id'>): Promise<Lodge> {
    return api.create(data)
  },

  async updateLodge(id: string, data: Partial<Lodge>): Promise<Lodge> {
    return api.update(id, data)
  },

  async deleteLodge(id: string): Promise<void> {
    return api.delete(id)
  },
}
