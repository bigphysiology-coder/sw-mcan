import { useQuery } from '@tanstack/react-query'
import { programsApi } from '@/api'
import type { ProgramItem } from '@/types'

export function usePrograms(type?: 'program' | 'project') {
  const { data, isLoading, error } = useQuery<ProgramItem[]>({
    queryKey: ['programs', type],
    queryFn: () => programsApi.getAll(),
  })

  const filtered = type ? (data ?? []).filter((p) => p.type === type) : (data ?? [])

  return { programs: filtered, isLoading, error }
}
