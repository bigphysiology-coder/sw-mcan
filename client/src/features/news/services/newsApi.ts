import type { NewsItem } from '@/features/news/types'

const NEWS_KEY = 'mcan-news'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function seed() {
  if (localStorage.getItem(NEWS_KEY)) return
  const news: NewsItem[] = [
    {
      id: 'n1',
      title: 'MCAN Southwest Holds Annual Leadership Retreat',
      slug: 'mcan-southwest-holds-annual-leadership-retreat',
      excerpt: 'Over 100 corps members gathered for a weekend of Islamic leadership training and community building in Ibadan.',
      content: 'The Muslim Corpers\' Association of Nigeria (MCAN) Southwest zone successfully held its annual leadership retreat at the Islamic Centre, Ibadan. The event featured lectures on Islamic leadership, teamwork exercises, and community development planning. Participants from all six states in the zone attended.',
      image: '/images/news/retreat.jpg',
      author: 'Admin User',
      publishedAt: '2025-11-20T08:00:00Z',
      tags: ['leadership', 'retreat', 'training'],
    },
    {
      id: 'n2',
      title: 'Zakat Distribution Exercise Reaches 500 Families',
      slug: 'zakat-distribution-exercise-reaches-500-families',
      excerpt: 'Annual zakat distribution programme touches lives across Lagos, Ogun and Oyo states.',
      content: 'MCAN Southwest organized its annual zakat collection and distribution exercise, reaching over 500 families across Lagos, Ogun, and Oyo states. The programme included food items, clothing, and financial assistance to support less privileged Muslim families during the blessed month.',
      image: '/images/news/zakat.jpg',
      author: 'Admin User',
      publishedAt: '2025-10-15T10:00:00Z',
      tags: ['zakat', 'welfare', 'community'],
    },
    {
      id: 'n3',
      title: 'New Lodge Inaugurated in Akure South',
      slug: 'new-lodge-inaugurated-in-akure-south',
      excerpt: 'MCAN Ondo State chapter inaugurates a new lodge facility for corps members serving in Akure South LGA.',
      content: 'The MCAN Ondo State chapter has inaugurated a new lodge facility in Akure South Local Government Area. The lodge can accommodate up to 30 corps members and features a prayer hall, study area, and recreational facilities. This brings the total number of functional lodges in Ondo State to 12.',
      image: '/images/news/lodge.jpg',
      author: 'Admin User',
      publishedAt: '2025-09-28T14:00:00Z',
      tags: ['lodge', 'inauguration', 'ondo'],
    },
  ]
  localStorage.setItem(NEWS_KEY, JSON.stringify(news))
}

seed()

function getStored(): NewsItem[] {
  try {
    return JSON.parse(localStorage.getItem(NEWS_KEY) || '[]') as NewsItem[]
  } catch {
    return []
  }
}

function save(data: NewsItem[]) {
  localStorage.setItem(NEWS_KEY, JSON.stringify(data))
}

export const newsApi = {
  async getNews(): Promise<NewsItem[]> {
    await delay()
    return getStored()
  },

  async getNewsItem(slug: string): Promise<NewsItem | undefined> {
    await delay()
    return getStored().find((n) => n.slug === slug)
  },

  async createNews(data: Omit<NewsItem, 'id' | 'slug' | 'publishedAt'>): Promise<NewsItem> {
    await delay()
    const item: NewsItem = {
      ...data,
      id: `n${Date.now()}`,
      slug: slugify(data.title),
      publishedAt: new Date().toISOString(),
    }
    const list = getStored()
    list.unshift(item)
    save(list)
    return item
  },

  async updateNews(id: string, data: Partial<NewsItem>): Promise<NewsItem> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((n) => n.id === id)
    if (idx === -1) throw new Error('News not found')
    list[idx] = { ...list[idx], ...data, slug: data.title ? slugify(data.title) : list[idx].slug }
    save(list)
    return list[idx]
  },

  async deleteNews(id: string): Promise<void> {
    await delay()
    save(getStored().filter((n) => n.id !== id))
  },
}
