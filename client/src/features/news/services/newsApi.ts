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
      image: '/photos/parade.jpg',
      author: 'MCAN Southwest',
      publishedAt: '2026-07-03T08:00:00Z',
      tags: ['leadership', 'retreat', 'training'],
    },
    {
      id: 'n2',
      title: 'Zakat Distribution Exercise Reaches 500 Families',
      slug: 'zakat-distribution-exercise-reaches-500-families',
      excerpt: 'Annual zakat distribution programme touches lives across Lagos, Ogun and Oyo states.',
      content: 'MCAN Southwest organized its annual zakat collection and distribution exercise, reaching over 500 families across Lagos, Ogun, and Oyo states. The programme included food items, clothing, and financial assistance to support less privileged Muslim families during the blessed month.',
      image: '/photos/member-story.jpg',
      author: 'MCAN Southwest',
      publishedAt: '2026-06-26T10:00:00Z',
      tags: ['zakat', 'welfare', 'community'],
    },
    {
      id: 'n3',
      title: 'New Lodge Inaugurated in Akure South',
      slug: 'new-lodge-inaugurated-in-akure-south',
      excerpt: 'MCAN Ondo State chapter inaugurates a new lodge facility for corps members serving in Akure South LGA.',
      content: 'The MCAN Ondo State chapter has inaugurated a new lodge facility in Akure South Local Government Area. The lodge can accommodate up to 30 corps members and features a prayer hall, study area, and recreational facilities. This brings the total number of functional lodges in Ondo State to 12.',
      image: '/photos/mosque-block.jpg',
      author: 'MCAN Southwest',
      publishedAt: '2026-06-18T14:00:00Z',
      tags: ['lodge', 'inauguration', 'ondo'],
    },
  ]
  localStorage.setItem(NEWS_KEY, JSON.stringify(news))
}

seed()

function normalizeImagePath(image?: string): string {
  if (!image) return ''
  if (image.startsWith('/images/news/')) {
    const fileName = image.split('/').pop() || ''
    const fallbackMap: Record<string, string> = {
      'retreat.jpg': '/photos/parade.jpg',
      'zakat.jpg': '/photos/member-story.jpg',
      'lodge.jpg': '/photos/mosque-block.jpg',
    }
    return fallbackMap[fileName] || '/photos/member-story.jpg'
  }
  return image
}

function normalizeNewsItem(item: NewsItem): NewsItem {
  return {
    ...item,
    image: normalizeImagePath(item.image),
    author: item.author === 'Admin User' ? 'MCAN Southwest' : item.author,
    publishedAt:
      item.author === 'Admin User' && item.publishedAt < '2026-01-01T00:00:00Z'
        ? ({
            n1: '2026-07-03T08:00:00Z',
            n2: '2026-06-26T10:00:00Z',
            n3: '2026-06-18T14:00:00Z',
          } as Record<string, string>)[item.id] || item.publishedAt
        : item.publishedAt,
  }
}

function getStored(): NewsItem[] {
  try {
    const stored = JSON.parse(localStorage.getItem(NEWS_KEY) || '[]') as NewsItem[]
    const normalized = stored.map(normalizeNewsItem)
    if (stored.some((item, index) => item.image !== normalized[index].image)) {
      save(normalized)
    }
    return normalized
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
