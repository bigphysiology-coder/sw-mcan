import { webContentApi as api } from '@/api'
import type { WebContent } from '@/types'

export const webcontentApi = {
  async getWebContent(): Promise<WebContent> {
    return api.get()
  },

  async updateWebContent(data: { headline?: string; sections?: { label: string; visible: boolean }[] }): Promise<WebContent> {
    return api.update(data)
  },
}
