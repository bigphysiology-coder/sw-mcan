import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { webcontentApi } from '@/features/webcontent/services/webcontentApi'
import type { WebContent } from '@/types'

const KEY = ['webcontent']

function useWebContent() {
  const queryClient = useQueryClient()

  const { data: content, isLoading, error } = useQuery<WebContent>({
    queryKey: KEY,
    queryFn: () => webcontentApi.getWebContent(),
  })

  const updateMutation = useMutation<WebContent, Error, Partial<WebContent>>({
    mutationFn: (data) => webcontentApi.updateWebContent(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  return {
    content,
    isLoading,
    error,
    updateContent: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  }
}

export { useWebContent }
