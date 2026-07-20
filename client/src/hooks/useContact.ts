import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactApi } from '@/api'
import type { ContactMessage } from '@/types'

export function useContact() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['contact'],
    queryFn: () => contactApi.getAll(),
  })

  const useMessage = (id: string) =>
    useQuery({
      queryKey: ['contact', id],
      queryFn: () => contactApi.getById(id),
      enabled: !!id,
    })

  const sendMutation = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; email: string; subject: string; category: string; message: string; phone?: string }) =>
      contactApi.send(data),
  })

  const deleteMutation = useMutation({
    mutationFn: contactApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] })
    },
  })

  const markAsReadMutation = useMutation({
    mutationFn: contactApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] })
    },
  })

  return {
    messages: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    useMessage,
    sendMessage: sendMutation.mutateAsync,
    deleteMessage: deleteMutation.mutateAsync,
    markAsRead: markAsReadMutation.mutateAsync,
    isSending: sendMutation.isPending,
  }
}
