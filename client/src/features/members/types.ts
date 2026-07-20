import type { Member as GlobalMember } from '@/types'

export interface Member extends GlobalMember {}

export interface CreateMemberPayload {
  firstName: string
  lastName: string
  email: string
  password?: string
  state: string
  phone?: string
  chapter?: string
  membershipType?: 'full' | 'associate' | 'student' | 'corporate'
}

export interface UpdateMemberPayload {
  firstName?: string
  lastName?: string
  email?: string
  state?: string
  phone?: string
  chapter?: string
  membershipType?: 'full' | 'associate' | 'student' | 'corporate'
  occupation?: string
  status?: 'active' | 'pending' | 'suspended' | 'deactivated'
}
