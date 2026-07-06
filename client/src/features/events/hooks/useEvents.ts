import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsApi } from '@/features/events/services/eventsApi'
import type { EventItem } from '@/types'

const EVENTS_KEY = ['events']

function useEvents() {
  const queryClient = useQueryClient()

  const { data: events, isLoading, error } = useQuery<EventItem[]>({
    queryKey: EVENTS_KEY,
    queryFn: () => eventsApi.getEvents(),
  })

  const createMutation = useMutation<EventItem, Error, Omit<EventItem, 'id'>>({
    mutationFn: (data) => eventsApi.createEvent(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EVENTS_KEY }),
  })

  const updateMutation = useMutation<EventItem, Error, { id: string; data: Partial<EventItem> }>({
    mutationFn: ({ id, data }) => eventsApi.updateEvent(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EVENTS_KEY }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => eventsApi.deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EVENTS_KEY }),
  })

  return {
    events: events || [],
    isLoading,
    error,
    createEvent: createMutation.mutateAsync,
    updateEvent: updateMutation.mutateAsync,
    deleteEvent: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

function useEvent(id: string) {
  return useQuery<EventItem | undefined>({
    queryKey: [...EVENTS_KEY, id],
    queryFn: () => eventsApi.getEvent(id),
    enabled: !!id,
  })
}

export { useEvents, useEvent }
