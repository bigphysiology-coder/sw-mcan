import type { Donation as GlobalDonation } from '@/types'

export interface Donation extends GlobalDonation {}

export interface CreateDonationPayload {
  donor: string
  amount: string
  amountValue: number
  purpose: string
  date: string
  status: 'Pending' | 'Confirmed'
}

export interface UpdateDonationPayload {
  donor?: string
  amount?: string
  amountValue?: number
  purpose?: string
  date?: string
  status?: 'Pending' | 'Confirmed'
}
