import { webContentApi as api } from '@/api'
import type { WebContent } from '@/types'

export const webcontentApi = {
  async getWebContent(): Promise<WebContent> {
    return api.get()
  },

  async createWebContent(data: {
    headline?: string
    subtitle?: string
    heroBackground?: string
    sections?: { label: string; visible: boolean }[]
    stats?: { label: string; value: string; prefix?: string; suffix?: string }[]
    pillars?: { title: string; description: string }[]
    stateChapters?: { name: string; members: string }[]
    ctaTitle?: string
    ctaSubtitle?: string
  }): Promise<WebContent> {
    return api.create(data)
  },

  async updateWebContent(data: {
    headline?: string
    subtitle?: string
    heroBackground?: string
    sections?: { label: string; visible: boolean }[]
    stats?: { label: string; value: string; prefix?: string; suffix?: string }[]
    pillars?: { title: string; description: string }[]
    stateChapters?: { name: string; members: string }[]
    ctaTitle?: string
    ctaSubtitle?: string
  }): Promise<WebContent> {
    return api.update(data)
  },
}
