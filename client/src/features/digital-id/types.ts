import type { DigitalIdRequest as GlobalDigitalIdRequest } from '@/types'

export interface DigitalIdRequest extends GlobalDigitalIdRequest {}

export interface RequestDigitalIdPayload {
  passportPhoto: string
  signature?: string
  additionalNote?: string
}
