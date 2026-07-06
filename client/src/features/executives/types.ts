import type { Executive as GlobalExecutive } from '@/types'

export interface Executive extends GlobalExecutive {}

export interface CreateExecutivePayload {
  name: string
  role: string
  photo: string
  state: string
}

export interface UpdateExecutivePayload {
  name?: string
  role?: string
  photo?: string
  state?: string
}
