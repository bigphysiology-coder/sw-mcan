import { eventsApi as api } from '@/api'
import type { EventItem } from '@/types'

export const eventsApi = {
  async getEvents(): Promise<EventItem[]> {
    return api.getPublic()
  },

  async getEvent(slug: string): Promise<EventItem | undefined> {
    try {
      return await api.getBySlug(slug)
    } catch {
      return undefined
    }
  },

  async createEvent(data: {
    title: string
    category: string
    startDate: string
    description?: string
    coverImage?: string
    location?: {
      venue?: string; address?: string; city?: string
      state?: string; isOnline?: boolean; onlineLink?: string
    }
    endDate?: string
    capacity?: number
    isFree?: boolean
    organizerContact?: string
    status?: string
  }): Promise<EventItem> {
    return api.create(data)
  },

  async updateEvent(id: string, data: Partial<EventItem>): Promise<EventItem> {
    return api.update(id, data)
  },

  async deleteEvent(id: string): Promise<void> {
    return api.delete(id)
  },
}
