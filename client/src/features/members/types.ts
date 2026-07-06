import type { Member as GlobalMember } from '@/types'

export interface Member extends GlobalMember {}

export interface CreateMemberPayload {
  name: string
  email: string
  password?: string
  state: string
  phone?: string
  nyscCallUpNumber?: string
}

export interface UpdateMemberPayload {
  name?: string
  email?: string
  state?: string
  phone?: string
  nyscCallUpNumber?: string
  lodge?: string
  status?: 'pending' | 'active' | 'inactive' | 'completed'
}
