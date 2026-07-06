import type { DigitalIdRequest } from '@/types'

const DIGITAL_ID_KEY = 'mcan-digital-ids-v3'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(DIGITAL_ID_KEY)) return
  const requests: DigitalIdRequest[] = [
    {
      id: 'd1',
      userId: '2',
      fullName: 'Member User',
      nyscCallUpNumber: 'OY/23A/4567',
      state: 'Oyo',
      postHeld: 'Ameer',
      validityBegin: 'OCT, 2025',
      validityEnd: 'SEP, 2026',
      phone: '+2348012345678',
      photo: '/photos/exec-abdulmalik.jpg',
      holderSignature: '',
      status: 'approved',
      createdAt: '2025-10-01T10:00:00Z',
    },
    {
      id: 'd2',
      userId: 'm1',
      fullName: 'Aisha Bello',
      nyscCallUpNumber: 'LA/23A/1234',
      state: 'Lagos',
      postHeld: 'Secretary',
      validityBegin: 'OCT, 2025',
      validityEnd: 'SEP, 2026',
      phone: '+2348011111111',
      photo: '/photos/exec-aminah.jpg',
      holderSignature: '',
      status: 'approved',
      createdAt: '2025-10-05T10:00:00Z',
    },
    {
      id: 'd3',
      userId: 'm3',
      fullName: 'Fatima Idris',
      nyscCallUpNumber: 'OG/23C/3456',
      state: 'Ogun',
      postHeld: 'PRO',
      validityBegin: 'NOV, 2025',
      validityEnd: 'OCT, 2026',
      phone: '+2348033333333',
      photo: '/photos/exec-fadlullah.jpg',
      holderSignature: '',
      status: 'pending',
      createdAt: '2025-11-01T10:00:00Z',
    },
  ]
  localStorage.setItem(DIGITAL_ID_KEY, JSON.stringify(requests))
}

seed()

function getStored(): DigitalIdRequest[] {
  try {
    const list = JSON.parse(localStorage.getItem(DIGITAL_ID_KEY) || '[]') as DigitalIdRequest[]
    return list.map((r) => ({
      ...r,
      postHeld: (r as any).postHeld ?? '',
      validityBegin: (r as any).validityBegin ?? '',
      validityEnd: (r as any).validityEnd ?? '',
    }))
  } catch {
    return []
  }
}

function save(data: DigitalIdRequest[]) {
  localStorage.setItem(DIGITAL_ID_KEY, JSON.stringify(data))
}

export const digitalIdApi = {
  async requestDigitalId(data: Omit<DigitalIdRequest, 'id' | 'status' | 'createdAt'> & { userId?: string }): Promise<DigitalIdRequest> {
    await delay()
    const existing = data.phone ? getStored().find((r) => r.phone && r.phone === data.phone) : undefined
    if (existing) throw new Error('A request with this phone number already exists')
    const request: DigitalIdRequest = {
      ...data,
      userId: data.userId ?? '',
      id: `d${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    const list = getStored()
    list.push(request)
    save(list)
    return request
  },

  async getMyDigitalId(userId: string): Promise<DigitalIdRequest | undefined> {
    await delay()
    return getStored().find((r) => r.userId === userId)
  },

  async getAllRequests(): Promise<DigitalIdRequest[]> {
    await delay()
    return getStored()
  },

  async approveRequest(id: string): Promise<DigitalIdRequest> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error('Request not found')
    list[idx].status = 'approved'
    save(list)
    return list[idx]
  },

  async rejectRequest(id: string, reason?: string): Promise<DigitalIdRequest> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error('Request not found')
    list[idx].status = 'rejected'
    list[idx].reason = reason
    save(list)
    return list[idx]
  },

  async deleteRequest(id: string): Promise<void> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error('Request not found')
    list.splice(idx, 1)
    save(list)
  },
}
