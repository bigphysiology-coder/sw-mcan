import { donationsApi as api } from '@/api'
import type { Donation } from '@/types'

export const donationsApi = {
  async getDonations(): Promise<Donation[]> {
    return api.getAll()
  },

  async getDonationStats(): Promise<{ totalDonations: number; raisedYear: number; raisedMonth: number }> {
    return api.getStats()
  },

  async createDonation(data: Omit<Donation, 'id'>): Promise<Donation> {
    return api.create(data)
  },

  async updateDonation(id: string, data: Partial<Donation>): Promise<Donation> {
    return api.update(id, data)
  },

  async deleteDonation(id: string): Promise<void> {
    return api.delete(id)
  },
}
