import type { NewsItem as GlobalNewsItem } from '@/types'

export interface NewsItem extends GlobalNewsItem {}

export interface CreateNewsPayload {
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  tags?: string[]
}

export interface UpdateNewsPayload {
  title?: string
  excerpt?: string
  content?: string
  image?: string
  author?: string
  tags?: string[]
}
