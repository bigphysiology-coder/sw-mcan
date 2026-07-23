import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { newsApi } from '@/api'
import type { NewsItem } from '@/types'

const OVERRIDES_KEY = 'news_status_overrides'

function getOverrides(): Record<string, { status: 'draft' | 'published'; publishedAt: string }> {
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}') } catch { return {} }
}

function saveOverride(id: string, status: 'draft' | 'published', publishedAt: string) {
  const o = getOverrides()
  o[id] = { status, publishedAt }
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(o))
}

function applyOverrides(list: NewsItem[]): NewsItem[] {
  const o = getOverrides()
  return list.map((item) => o[item.id] ? { ...item, ...o[item.id] } : item)
}

export function useNews() {
  const queryClient = useQueryClient()

  const publicQuery = useQuery({
    queryKey: ['news', 'public'],
    queryFn: () => newsApi.getPublic(),
  })

  const adminQuery = useQuery({
    queryKey: ['news', 'admin'],
    queryFn: async () => {
      const data = await newsApi.getAllAdmin()
      return applyOverrides(data)
    },
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
    onSuccess: (_, id) => {
      saveOverride(id, 'published', new Date().toISOString())
      queryClient.setQueryData<NewsItem[]>(['news', 'admin'], (old) =>
        old ? applyOverrides(old.map((item) => item.id === id ? { ...item, status: 'published' as const, publishedAt: new Date().toISOString() } : item)) : old,
      )
    },
  })

  const unpublishMutation = useMutation({
    mutationFn: newsApi.unpublish,
    onSuccess: (_, id) => {
      saveOverride(id, 'draft', '')
      queryClient.setQueryData<NewsItem[]>(['news', 'admin'], (old) =>
        old ? applyOverrides(old.map((item) => item.id === id ? { ...item, status: 'draft' as const, publishedAt: '' } : item)) : old,
      )
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
