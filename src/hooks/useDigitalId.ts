import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { digitalIdApi } from '@/api'

export function useDigitalId() {
  const queryClient = useQueryClient()

  const myIdQuery = useQuery({
    queryKey: ['digital-id', 'my'],
    queryFn: digitalIdApi.getMyId,
  })

  const allQuery = useQuery({
    queryKey: ['digital-id', 'all'],
    queryFn: () => digitalIdApi.getAll(),
  })

  const useRequest = (id: string) =>
    useQuery({
      queryKey: ['digital-id', id],
      queryFn: () => digitalIdApi.getById(id),
      enabled: !!id,
    })

  const requestMutation = useMutation({
    mutationFn: digitalIdApi.request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-id'] })
    },
  })

  const approveMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note?: string }) =>
      digitalIdApi.approve(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-id'] })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      digitalIdApi.reject(id, reason ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-id'] })
    },
  })

  const revokeMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      digitalIdApi.revoke(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-id'] })
    },
  })

  return {
    myId: myIdQuery.data,
    isLoading: myIdQuery.isLoading,
    requests: allQuery.data ?? [],
    isAllLoading: allQuery.isLoading,
    useRequest,
    requestDigitalId: requestMutation.mutateAsync,
    approveRequest: approveMutation.mutateAsync,
    rejectRequest: rejectMutation.mutateAsync,
    revokeRequest: revokeMutation.mutateAsync,
    isRequesting: requestMutation.isPending,
  }
}
