import type { GalleryPhoto as GlobalGalleryPhoto } from '@/types'

export interface GalleryPhoto extends GlobalGalleryPhoto {}

export interface CreateGalleryPhotoPayload {
  src: string
  caption: string
  span?: 'wide' | 'tall'
}

export interface UpdateGalleryPhotoPayload {
  src?: string
  caption?: string
  span?: 'wide' | 'tall'
}
