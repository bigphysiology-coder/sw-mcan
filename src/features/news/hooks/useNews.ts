import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { newsApi } from '@/features/news/services/newsApi'
import type { NewsItem } from '@/features/news/types'

const NEWS_KEY = ['news']

function useNews() {
  const queryClient = useQueryClient()

  const { data: news, isLoading, error } = useQuery<NewsItem[]>({
    queryKey: NEWS_KEY,
    queryFn: () => newsApi.getNews(),
  })

  const createMutation = useMutation<NewsItem, Error, Omit<NewsItem, 'id' | 'slug' | 'publishedAt'>>({
    mutationFn: (data) => newsApi.createNews(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NEWS_KEY }),
  })

  const updateMutation = useMutation<NewsItem, Error, { id: string; data: Partial<NewsItem> }>({
    mutationFn: ({ id, data }) => newsApi.updateNews(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NEWS_KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => newsApi.deleteNews(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NEWS_KEY }),
  })

  return {
    news: news || [],
    isLoading,
    error,
    createNews: createMutation.mutateAsync,
    updateNews: updateMutation.mutateAsync,
    deleteNews: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

function useNewsItem(slug: string) {
  return useQuery<NewsItem | undefined>({
    queryKey: [...NEWS_KEY, slug],
    queryFn: () => newsApi.getNewsItem(slug),
    enabled: !!slug,
  })
}

export { useNews, useNewsItem }
