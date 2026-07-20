import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { newsApi } from '@/api'
import type { NewsItem } from '@/types'

export function useNews() {
  const queryClient = useQueryClient()

  const publicQuery = useQuery({
    queryKey: ['news', 'public'],
    queryFn: () => newsApi.getPublic(),
  })

  const adminQuery = useQuery({
    queryKey: ['news', 'admin'],
    queryFn: () => newsApi.getAllAdmin(),
  })

  const useNewsItem = (slug: string) =>
    useQuery({
      queryKey: ['news', slug],
      queryFn: () => newsApi.getBySlug(slug),
      enabled: !!slug,
    })

  const createMutation = useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewsItem> }) =>
      newsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: newsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })

  const publishMutation = useMutation({
    mutationFn: newsApi.publish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })

  const unpublishMutation = useMutation({
    mutationFn: newsApi.unpublish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })

  return {
    news: publicQuery.data ?? [],
    isLoading: publicQuery.isLoading,
    error: publicQuery.error,
    adminNews: adminQuery.data ?? [],
    isAdminLoading: adminQuery.isLoading,
    useNewsItem,
    createNews: createMutation.mutateAsync,
    updateNews: updateMutation.mutateAsync,
    deleteNews: deleteMutation.mutateAsync,
    publishNews: publishMutation.mutateAsync,
    unpublishNews: unpublishMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  }
}
