import { contactApi as api } from '@/api'
import type { ContactMessage } from '@/types'

export const contactApi = {
  async send(payload: {
    firstName: string
    lastName: string
    email: string
    subject: string
    category: string
    message: string
    phone?: string
  }): Promise<ContactMessage> {
    return api.send(payload)
  },

  getAll(): Promise<ContactMessage[]> {
    return api.getAll()
  },

  async getById(id: string): Promise<ContactMessage | undefined> {
    try {
      return await api.getById(id)
    } catch {
      return undefined
    }
  },

  async markAsRead(id: string): Promise<void> {
    return api.markAsRead(id)
  },

  async deleteMessage(id: string): Promise<void> {
    return api.delete(id)
  },

  getUnreadCount(): Promise<number> {
    return api.getAll().then((msgs) => msgs.filter((m) => !m.read).length)
  },
}
