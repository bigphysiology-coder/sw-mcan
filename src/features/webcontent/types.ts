import type { WebContent as GlobalWebContent } from '@/types'

export interface WebContent extends GlobalWebContent {}

export interface UpdateWebContentPayload {
  headline?: string
  subtitle?: string
  heroBackground?: string
  sections?: { label: string; visible: boolean }[]
  stats?: { label: string; value: string; prefix?: string; suffix?: string }[]
  pillars?: { title: string; description: string }[]
  stateChapters?: { name: string; members: string }[]
  ctaTitle?: string
  ctaSubtitle?: string
}
