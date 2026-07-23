import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { membersApi } from '@/features/members/services/membersApi'
import type { Member, CreateMemberPayload } from '@/features/members/types'

const MEMBERS_KEY = ['members']

function useMembers() {
  const queryClient = useQueryClient()

  const { data: members, isLoading, error } = useQuery<Member[]>({
    queryKey: MEMBERS_KEY,
    queryFn: () => membersApi.getMembers(),
  })

  const updateMutation = useMutation<Member, Error, { id: string; data: Partial<Member> }>({
    mutationFn: ({ id, data }) => membersApi.updateMember(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEMBERS_KEY }),
  })

  const createMutation = useMutation<Member, Error, CreateMemberPayload>({
    mutationFn: (data) => membersApi.createMember(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEMBERS_KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => membersApi.deleteMember(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEMBERS_KEY }),
  })

  return {
    members: members || [],
    isLoading,
    error,
    createMember: createMutation.mutateAsync,
    updateMember: updateMutation.mutateAsync,
    deleteMember: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

function useMember(id: string) {
  return useQuery<Member | undefined>({
    queryKey: [...MEMBERS_KEY, id],
    queryFn: () => membersApi.getMember(id),
    enabled: !!id,
  })
}

export { useMembers, useMember }
