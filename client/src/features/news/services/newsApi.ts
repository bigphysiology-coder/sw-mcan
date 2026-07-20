import { newsApi as api } from '@/api'
import type { NewsItem } from '@/features/news/types'

export const newsApi = {
  async getNews(): Promise<NewsItem[]> {
    return api.getPublic()
  },

  async getNewsItem(slug: string): Promise<NewsItem | undefined> {
    try {
      return await api.getBySlug(slug)
    } catch {
      return undefined
    }
  },

  async createNews(data: {
    title: string
    content: string
    excerpt: string
    category: string
    coverImage?: string
    tags?: string[]
    featured?: boolean
    status?: string
  }): Promise<NewsItem> {
    return api.create(data)
  },

  async updateNews(id: string, data: Partial<NewsItem>): Promise<NewsItem> {
    return api.update(id, data)
  },

  async deleteNews(id: string): Promise<void> {
    return api.delete(id)
  },
}
