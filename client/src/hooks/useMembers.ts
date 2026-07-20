import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { membersApi } from '@/api'
import type { Member } from '@/types'

export function useMembers() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['members'],
    queryFn: () => membersApi.getAll(),
  })

  const useMember = (id: string) =>
    useQuery({
      queryKey: ['members', id],
      queryFn: () => membersApi.getById(id),
      enabled: !!id,
    })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Member> }) =>
      membersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: membersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, reason }: { id: string; status: string; reason?: string }) =>
      membersApi.updateStatus(id, status, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  return {
    members: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    useMember,
    updateMember: updateMutation.mutateAsync,
    deleteMember: deleteMutation.mutateAsync,
    updateMemberStatus: updateStatusMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  }
}
