import type { WebContent } from '@/features/webcontent/types'

const WEBCONTENT_KEY = 'mcan-webcontent'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(WEBCONTENT_KEY)) return
  const data: WebContent = {
    headline: 'The home of Muslim corps members across Southwest Nigeria',
    sections: [
      { label: 'Hero', visible: true },
      { label: 'Programs preview', visible: true },
      { label: 'Events', visible: true },
      { label: 'State chapters', visible: true },
      { label: 'Donate', visible: true },
      { label: 'Lodges directory', visible: true },
      { label: 'FAQ', visible: true },
    ],
  }
  localStorage.setItem(WEBCONTENT_KEY, JSON.stringify(data))
}

seed()

function getStored(): WebContent {
  try {
    return JSON.parse(localStorage.getItem(WEBCONTENT_KEY) || 'null') as WebContent
  } catch {
    return { headline: '', sections: [] }
  }
}

function save(data: WebContent) {
  localStorage.setItem(WEBCONTENT_KEY, JSON.stringify(data))
}

export const webcontentApi = {
  async getWebContent(): Promise<WebContent> {
    await delay()
    return getStored()
  },

  async updateWebContent(data: Partial<WebContent>): Promise<WebContent> {
    await delay()
    const current = getStored()
    const updated: WebContent = { ...current, ...data }
    save(updated)
    return updated
  },
}
