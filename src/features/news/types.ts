import type { NewsItem as GlobalNewsItem } from '@/types'

export interface NewsItem extends GlobalNewsItem {}

export interface CreateNewsPayload {
  title: string
  excerpt: string
  content: string
  coverImage?: string
  category: 'announcement' | 'news' | 'press-release' | 'update'
  tags?: string[]
  featured?: boolean
  status?: 'draft' | 'published'
}

export interface UpdateNewsPayload {
  title?: string
  excerpt?: string
  content?: string
  coverImage?: string
  category?: 'announcement' | 'news' | 'press-release' | 'update'
  tags?: string[]
  featured?: boolean
  status?: 'draft' | 'published'
}
