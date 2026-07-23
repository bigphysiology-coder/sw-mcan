import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { donationsApi } from '@/features/donations/services/donationsApi'
import type { Donation } from '@/types'

const KEY = ['donations']

function useDonations() {
  const queryClient = useQueryClient()

  const { data: donations, isLoading, error } = useQuery<Donation[]>({
    queryKey: KEY,
    queryFn: () => donationsApi.getDonations(),
  })

  const { data: stats } = useQuery({
    queryKey: ['donation-stats'],
    queryFn: () => donationsApi.getDonationStats(),
  })

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: KEY })
    queryClient.invalidateQueries({ queryKey: ['donation-stats'] })
  }

  const createMutation = useMutation<Donation, Error, Omit<Donation, 'id'>>({
    mutationFn: (data) => donationsApi.createDonation(data),
    onSuccess: invalidateAll,
  })

  const updateMutation = useMutation<Donation, Error, { id: string; data: Partial<Donation> }>({
    mutationFn: ({ id, data }) => donationsApi.updateDonation(id, data),
    onSuccess: invalidateAll,
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => donationsApi.deleteDonation(id),
    onSuccess: invalidateAll,
  })

  return {
    donations: donations || [],
    stats,
    isLoading,
    error,
    createDonation: createMutation.mutateAsync,
    updateDonation: updateMutation.mutateAsync,
    deleteDonation: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export { useDonations }
