import type { EventItem as GlobalEventItem } from '@/types'

export interface EventItem extends GlobalEventItem {}

export interface CreateEventPayload {
  title: string
  description?: string
  category: 'meeting' | 'conference' | 'seminar' | 'workshop' | 'social' | 'other'
  coverImage?: string
  location?: {
    venue?: string
    address?: string
    city?: string
    state?: string
    isOnline?: boolean
    onlineLink?: string
  }
  startDate: string
  endDate?: string
  capacity?: number
  isFree?: boolean
  organizerContact?: string
  status?: 'draft' | 'published' | 'cancelled'
}

export interface UpdateEventPayload {
  title?: string
  description?: string
  category?: 'meeting' | 'conference' | 'seminar' | 'workshop' | 'social' | 'other'
  coverImage?: string
  location?: {
    venue?: string
    address?: string
    city?: string
    state?: string
    isOnline?: boolean
    onlineLink?: string
  }
  startDate?: string
  endDate?: string
  capacity?: number
  isFree?: boolean
  organizerContact?: string
  status?: 'draft' | 'published' | 'cancelled'
}
