import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { executivesApi } from '@/features/executives/services/executivesApi'
import type { Executive } from '@/types'

const KEY = ['executives']

function useExecutives() {
  const queryClient = useQueryClient()

  const { data: executives, isLoading, error } = useQuery<Executive[]>({
    queryKey: KEY,
    queryFn: () => executivesApi.getExecutives(),
  })

  const createMutation = useMutation<Executive, Error, Omit<Executive, 'id'>>({
    mutationFn: (data) => executivesApi.createExecutive(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => executivesApi.deleteExecutive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  return {
    executives: executives || [],
    isLoading,
    error,
    createExecutive: createMutation.mutateAsync,
    deleteExecutive: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export { useExecutives }
