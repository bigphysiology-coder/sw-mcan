import type { EventItem as GlobalEventItem } from '@/types'

export interface EventItem extends GlobalEventItem {}

export interface CreateEventPayload {
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  type: 'lecture' | 'welfare' | 'education' | 'outreach' | 'convention'
  registrationUrl?: string
}

export interface UpdateEventPayload {
  title?: string
  description?: string
  date?: string
  time?: string
  location?: string
  image?: string
  type?: 'lecture' | 'welfare' | 'education' | 'outreach' | 'convention'
  registrationUrl?: string
}
