import { executivesApi as api } from '@/api'
import type { Executive } from '@/types'

export const executivesApi = {
  async getExecutives(): Promise<Executive[]> {
    return api.getAll()
  },

  async getExecutive(id: string): Promise<Executive | undefined> {
    try {
      return await api.getAll().then((list) => list.find((e) => e.id === id))
    } catch {
      return undefined
    }
  },

  async createExecutive(data: Omit<Executive, 'id'>): Promise<Executive> {
    return api.create(data)
  },

  async updateExecutive(id: string, data: Partial<Executive>): Promise<Executive> {
    return api.update(id, data)
  },

  async deleteExecutive(id: string): Promise<void> {
    return api.delete(id)
  },
}
