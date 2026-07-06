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

  const createMutation = useMutation<Donation, Error, Omit<Donation, 'id'>>({
    mutationFn: (data) => donationsApi.createDonation(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const updateMutation = useMutation<Donation, Error, { id: string; data: Partial<Donation> }>({
    mutationFn: ({ id, data }) => donationsApi.updateDonation(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => donationsApi.deleteDonation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
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
