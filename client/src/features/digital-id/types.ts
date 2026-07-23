import type { DigitalIdRequest as GlobalDigitalIdRequest } from '@/types'

export interface DigitalIdRequest extends GlobalDigitalIdRequest {}

export interface RequestDigitalIdPayload {
  fullName: string
  nyscCallUpNumber: string
  state: string
  phone: string
  passportPhoto: string
  postHeld?: string
  validityBegin?: string
  validityEnd?: string
  signature?: string
  additionalNote?: string
}
