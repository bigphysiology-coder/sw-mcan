import type { ContactMessage } from '@/types'

const MESSAGES_KEY = 'mcan-contact-messages'

const delay = () => new Promise<void>((r) => setTimeout(r, 400))

function getStoredMessages(): ContactMessage[] {
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]') as ContactMessage[]
  } catch {
    return []
  }
}

function saveMessages(messages: ContactMessage[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
}

export const contactApi = {
  async send(payload: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<ContactMessage> {
    await delay()
    const messages = getStoredMessages()
    const newMessage: ContactMessage = {
      ...payload,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      read: false,
    }
    messages.unshift(newMessage)
    saveMessages(messages)
    return newMessage
  },

  getAll(): ContactMessage[] {
    return getStoredMessages()
  },

  markAsRead(id: string): void {
    const messages = getStoredMessages()
    const msg = messages.find((m) => m.id === id)
    if (msg) {
      msg.read = true
      saveMessages(messages)
    }
  },

  deleteMessage(id: string): void {
    const messages = getStoredMessages().filter((m) => m.id !== id)
    saveMessages(messages)
  },

  getUnreadCount(): number {
    return getStoredMessages().filter((m) => !m.read).length
  },
}
