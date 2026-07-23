import type { Lodge as GlobalLodge } from '@/types'

export interface Lodge extends GlobalLodge {}

export interface CreateLodgePayload {
  name: string
  photo: string
  address: string
  state: string
  capacity: number
  status: 'Available' | 'Limited' | 'Full'
  coordinator: string
  phone: string
  map: string
}

export interface UpdateLodgePayload {
  name?: string
  photo?: string
  address?: string
  state?: string
  capacity?: number
  status?: 'Available' | 'Limited' | 'Full'
  coordinator?: string
  phone?: string
  map?: string
}
