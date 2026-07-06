import type { DigitalIdRequest as GlobalDigitalIdRequest } from '@/types'

export interface DigitalIdRequest extends GlobalDigitalIdRequest {}

export interface RequestDigitalIdPayload {
  userId: string
  fullName: string
  nyscCallUpNumber: string
  state: string
  validityBegin: string
  validityEnd: string
  photo: string
}
