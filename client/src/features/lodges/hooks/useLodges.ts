import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lodgesApi } from '@/features/lodges/services/lodgesApi'
import type { Lodge } from '@/types'

const KEY = ['lodges']

function useLodges() {
  const queryClient = useQueryClient()

  const { data: lodges, isLoading, error } = useQuery<Lodge[]>({
    queryKey: KEY,
    queryFn: () => lodgesApi.getLodges(),
  })

  const createMutation = useMutation<Lodge, Error, Omit<Lodge, 'id'>>({
    mutationFn: (data) => lodgesApi.createLodge(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const updateMutation = useMutation<Lodge, Error, { id: string; data: Partial<Lodge> }>({
    mutationFn: ({ id, data }) => lodgesApi.updateLodge(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => lodgesApi.deleteLodge(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  return {
    lodges: lodges || [],
    isLoading,
    error,
    createLodge: createMutation.mutateAsync,
    updateLodge: updateMutation.mutateAsync,
    deleteLodge: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export { useLodges }
