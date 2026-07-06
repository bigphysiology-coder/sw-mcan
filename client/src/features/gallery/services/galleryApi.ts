import type { GalleryPhoto } from '@/features/gallery/types'

const GALLERY_KEY = 'mcan-gallery'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(GALLERY_KEY)) return
  const photos: GalleryPhoto[] = [
    { id: 'g1', src: '/photos/parade.jpg', caption: 'NYSC passing-out parade', span: 'tall' },
    { id: 'g2', src: '/photos/award-presentation.jpg', caption: 'Award presentation' },
    { id: 'g3', src: '/photos/corps-group.jpg', caption: 'Corps members, Ekiti chapter' },
    { id: 'g4', src: '/photos/lecture-hall.jpg', caption: 'Halaqah in session' },
    { id: 'g5', src: '/photos/mcan-bus.jpg', caption: 'MCAN Ekiti transit bus' },
    { id: 'g6', src: '/photos/mosque-dome.jpg', caption: 'Central mosque project', span: 'wide' },
    { id: 'g7', src: '/photos/correctional-visit.jpg', caption: 'Correctional centre da’wah' },
    { id: 'g8', src: '/photos/mosque-block.jpg', caption: 'Chapter mosque development' },
    { id: 'g9', src: '/photos/member-story.jpg', caption: 'Member story', span: 'tall' },
  ]
  localStorage.setItem(GALLERY_KEY, JSON.stringify(photos))
}

seed()

function getStored(): GalleryPhoto[] {
  try {
    return JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]') as GalleryPhoto[]
  } catch {
    return []
  }
}

function save(data: GalleryPhoto[]) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(data))
}

export const galleryApi = {
  async getPhotos(): Promise<GalleryPhoto[]> {
    await delay()
    return getStored()
  },

  async getPhoto(id: string): Promise<GalleryPhoto | undefined> {
    await delay()
    return getStored().find((p) => p.id === id)
  },

  async createPhoto(data: Omit<GalleryPhoto, 'id'>): Promise<GalleryPhoto> {
    await delay()
    const item: GalleryPhoto = { ...data, id: `g${Date.now()}` }
    const list = getStored()
    list.push(item)
    save(list)
    return item
  },

  async updatePhoto(id: string, data: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((p) => p.id === id)
    if (idx === -1) throw new Error('Photo not found')
    list[idx] = { ...list[idx], ...data }
    save(list)
    return list[idx]
  },

  async deletePhoto(id: string): Promise<void> {
    await delay()
    save(getStored().filter((p) => p.id !== id))
  },

  async uploadPhoto(base64DataUrl: string, caption: string): Promise<GalleryPhoto> {
    await delay()
    const item: GalleryPhoto = { id: `g${Date.now()}`, src: base64DataUrl, caption }
    const list = getStored()
    list.push(item)
    save(list)
    return item
  },
}
