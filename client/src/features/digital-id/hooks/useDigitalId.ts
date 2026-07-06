import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { digitalIdApi } from '@/features/digital-id/services/digitalIdApi'
import type { DigitalIdRequest } from '@/types'

const DIGITAL_ID_KEY = ['digital-ids']

function useDigitalId(userId?: string) {
  const queryClient = useQueryClient()

  const { data: myId, isLoading: myIdLoading } = useQuery<DigitalIdRequest | undefined>({
    queryKey: [...DIGITAL_ID_KEY, 'my', userId],
    queryFn: () => digitalIdApi.getMyDigitalId(userId!),
    enabled: !!userId,
  })

  const requestMutation = useMutation<DigitalIdRequest, Error, Omit<DigitalIdRequest, 'id' | 'status' | 'createdAt'>>({
    mutationFn: (data) => digitalIdApi.requestDigitalId(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DIGITAL_ID_KEY }),
  })

  return {
    myId,
    myIdLoading,
    requestDigitalId: requestMutation.mutateAsync,
    isRequesting: requestMutation.isPending,
  }
}

function useDigitalIdRequests() {
  const queryClient = useQueryClient()

  const { data: requests, isLoading, error } = useQuery<DigitalIdRequest[]>({
    queryKey: [...DIGITAL_ID_KEY, 'all'],
    queryFn: () => digitalIdApi.getAllRequests(),
  })

  const approveMutation = useMutation<DigitalIdRequest, Error, string>({
    mutationFn: (id) => digitalIdApi.approveRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DIGITAL_ID_KEY }),
  })

  const rejectMutation = useMutation<DigitalIdRequest, Error, { id: string; reason?: string }>({
    mutationFn: ({ id, reason }) => digitalIdApi.rejectRequest(id, reason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DIGITAL_ID_KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => digitalIdApi.deleteRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DIGITAL_ID_KEY }),
  })

  return {
    requests: requests || [],
    isLoading,
    error,
    approveRequest: approveMutation.mutateAsync,
    rejectRequest: rejectMutation.mutateAsync,
    deleteRequest: deleteMutation.mutateAsync,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export { useDigitalId, useDigitalIdRequests }
