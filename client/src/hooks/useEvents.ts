import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsApi } from '@/api'
import type { EventItem } from '@/types'

export function useEvents() {
  const queryClient = useQueryClient()

  const publicQuery = useQuery({
    queryKey: ['events', 'public'],
    queryFn: () => eventsApi.getPublic(),
  })

  const adminQuery = useQuery({
    queryKey: ['events', 'admin'],
    queryFn: () => eventsApi.getAllAdmin(),
  })

  const useEventBySlug = (slug: string) =>
    useQuery({
      queryKey: ['events', slug],
      queryFn: () => eventsApi.getBySlug(slug),
      enabled: !!slug,
    })

  const createMutation = useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EventItem> }) =>
      eventsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: eventsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const publishMutation = useMutation({
    mutationFn: eventsApi.publish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      eventsApi.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  return {
    events: publicQuery.data ?? [],
    isLoading: publicQuery.isLoading,
    error: publicQuery.error,
    adminEvents: adminQuery.data ?? [],
    isAdminLoading: adminQuery.isLoading,
    useEventBySlug,
    createEvent: createMutation.mutateAsync,
    updateEvent: updateMutation.mutateAsync,
    deleteEvent: deleteMutation.mutateAsync,
    publishEvent: publishMutation.mutateAsync,
    cancelEvent: cancelMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  }
}
