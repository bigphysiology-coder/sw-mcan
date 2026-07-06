import type { WebContent as GlobalWebContent } from '@/types'

export interface WebContent extends GlobalWebContent {}

export interface UpdateWebContentPayload {
  headline?: string
  sections?: { label: string; visible: boolean }[]
}
