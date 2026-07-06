import type { Donation } from '@/features/donations/types'

const DONATIONS_KEY = 'mcan-donations'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(DONATIONS_KEY)) return
  const donations: Donation[] = [
    { id: 'd1', donor: 'Abdullah Bello', amount: '₦25,000', amountValue: 25000, purpose: 'Ease logistics', date: '18 Jun', status: 'Confirmed' },
    { id: 'd2', donor: 'Anonymous', amount: '₦100,000', amountValue: 100000, purpose: 'Mosque project', date: '17 Jun', status: 'Pending' },
    { id: 'd3', donor: 'Fatimah I.', amount: '₦5,000', amountValue: 5000, purpose: 'Feed a soul', date: '17 Jun', status: 'Confirmed' },
    { id: 'd4', donor: 'Yusuf Adeyemi', amount: '₦50,000', amountValue: 50000, purpose: 'Welfare fund', date: '15 Jun', status: 'Confirmed' },
    { id: 'd5', donor: 'Aisha M.', amount: '₦10,000', amountValue: 10000, purpose: 'Feed a soul', date: '14 Jun', status: 'Pending' },
  ]
  localStorage.setItem(DONATIONS_KEY, JSON.stringify(donations))
}

seed()

function getStored(): Donation[] {
  try {
    return JSON.parse(localStorage.getItem(DONATIONS_KEY) || '[]') as Donation[]
  } catch {
    return []
  }
}

function save(data: Donation[]) {
  localStorage.setItem(DONATIONS_KEY, JSON.stringify(data))
}

export const donationsApi = {
  async getDonations(): Promise<Donation[]> {
    await delay()
    return getStored()
  },

  async getDonation(id: string): Promise<Donation | undefined> {
    await delay()
    return getStored().find((d) => d.id === id)
  },

  async createDonation(data: Omit<Donation, 'id'>): Promise<Donation> {
    await delay()
    const item: Donation = { ...data, id: `d${Date.now()}` }
    const list = getStored()
    list.unshift(item)
    save(list)
    return item
  },

  async updateDonation(id: string, data: Partial<Donation>): Promise<Donation> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((d) => d.id === id)
    if (idx === -1) throw new Error('Donation not found')
    list[idx] = { ...list[idx], ...data }
    save(list)
    return list[idx]
  },

  async deleteDonation(id: string): Promise<void> {
    await delay()
    save(getStored().filter((d) => d.id !== id))
  },

  async getDonationStats(): Promise<{ raisedYear: number; raisedMonth: number; pendingReview: number; monthlyPartners: number }> {
    await delay()
    const list = getStored()
    const total = list.reduce((s, d) => s + (d.status === 'Confirmed' ? d.amountValue : 0), 0)
    return {
      raisedYear: total,
      raisedMonth: Math.round(total * 0.12),
      pendingReview: list.filter((d) => d.status === 'Pending').length,
      monthlyPartners: 342,
    }
  },
}
