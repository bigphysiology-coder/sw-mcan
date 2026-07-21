import { galleryApi as api } from '@/api'
import type { GalleryPhoto } from '@/types'

export const galleryApi = {
  async getPhotos(): Promise<GalleryPhoto[]> {
    return api.getAll()
  },

  async createPhoto(data: Omit<GalleryPhoto, 'id'>): Promise<GalleryPhoto> {
    return api.create(data)
  },

  async updatePhoto(id: string, data: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
    return api.update(id, data)
  },

  async deletePhoto(id: string): Promise<void> {
    return api.delete(id)
  },

  async uploadPhoto(_src: string, _caption: string): Promise<GalleryPhoto> {
    const formData = new FormData()
    formData.append('src', _src)
    formData.append('caption', _caption)
    const { url } = await api.upload(formData)
    return api.create({ src: url, caption: _caption })
  },
}
