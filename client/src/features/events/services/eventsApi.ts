import type { EventItem } from '@/types'

const EVENTS_KEY = 'mcan-events'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(EVENTS_KEY)) return
  const events: EventItem[] = [
    {
      id: 'e1',
      title: 'Islamic Knowledge Seminar 2025',
      description: 'A comprehensive seminar covering various aspects of Islamic knowledge, including fiqh, tafsir, and seerah. Open to all corps members in the Southwest zone.',
      date: '2026-01-15',
      time: '09:00',
      location: 'Islamic Centre, Ibadan, Oyo State',
      image: '/images/events/seminar.jpg',
      type: 'education',
      registrationUrl: 'https://forms.gle/example1',
    },
    {
      id: 'e2',
      title: 'Monthly Welfare Visit – Orphanage Home',
      description: 'Join us for our monthly welfare outreach to the Al-Nur Orphanage Home. We will be providing food supplies, clothing, and educational materials.',
      date: '2026-01-22',
      time: '08:00',
      location: 'Al-Nur Orphanage Home, Ikeja, Lagos',
      image: '/images/events/welfare.jpg',
      type: 'welfare',
      registrationUrl: 'https://forms.gle/example2',
    },
    {
      id: 'e3',
      title: 'MCAN Southwest Annual Convention',
      description: 'The flagship event of MCAN Southwest zone featuring lectures, networking, and cultural displays. Expected attendance of over 500 corps members.',
      date: '2026-02-20',
      time: '08:30',
      location: 'University of Ibadan Conference Centre',
      image: '/images/events/convention.jpg',
      type: 'convention',
      registrationUrl: 'https://forms.gle/example3',
    },
  ]
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
}

seed()

function getStored(): EventItem[] {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]') as EventItem[]
  } catch {
    return []
  }
}

function save(data: EventItem[]) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(data))
}

export const eventsApi = {
  async getEvents(): Promise<EventItem[]> {
    await delay()
    return getStored()
  },

  async getEvent(id: string): Promise<EventItem | undefined> {
    await delay()
    return getStored().find((e) => e.id === id)
  },

  async createEvent(data: Omit<EventItem, 'id'>): Promise<EventItem> {
    await delay()
    const item: EventItem = { ...data, id: `e${Date.now()}` }
    const list = getStored()
    list.push(item)
    save(list)
    return item
  },

  async updateEvent(id: string, data: Partial<EventItem>): Promise<EventItem> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((e) => e.id === id)
    if (idx === -1) throw new Error('Event not found')
    list[idx] = { ...list[idx], ...data }
    save(list)
    return list[idx]
  },

  async deleteEvent(id: string): Promise<void> {
    await delay()
    save(getStored().filter((e) => e.id !== id))
  },
}
