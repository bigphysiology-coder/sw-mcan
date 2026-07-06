import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { galleryApi } from '@/features/gallery/services/galleryApi'
import type { GalleryPhoto } from '@/types'

const KEY = ['gallery']

function useGallery() {
  const queryClient = useQueryClient()

  const { data: photos, isLoading, error } = useQuery<GalleryPhoto[]>({
    queryKey: KEY,
    queryFn: () => galleryApi.getPhotos(),
  })

  const createMutation = useMutation<GalleryPhoto, Error, Omit<GalleryPhoto, 'id'>>({
    mutationFn: (data) => galleryApi.createPhoto(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const uploadMutation = useMutation<GalleryPhoto, Error, { src: string; caption: string }>({
    mutationFn: ({ src, caption }) => galleryApi.uploadPhoto(src, caption),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => galleryApi.deletePhoto(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  return {
    photos: photos || [],
    isLoading,
    error,
    createPhoto: createMutation.mutateAsync,
    uploadPhoto: uploadMutation.mutateAsync,
    deletePhoto: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUploading: uploadMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export { useGallery }
