import type { Member } from '@/features/members/types'

const MEMBERS_KEY = 'mcan-members'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(MEMBERS_KEY)) return
  const members: Member[] = [
    { id: 'm1', name: 'Aisha Bello', email: 'aisha@example.com', role: 'member', state: 'Lagos', phone: '+2348011111111', nyscCallUpNumber: 'LA/23A/1234', lodge: 'Agege', status: 'active', digitalIdStatus: 'approved', createdAt: '2025-09-01T10:00:00Z' },
    { id: 'm2', name: 'Usman Yahaya', email: 'usman@example.com', role: 'member', state: 'Oyo', phone: '+2348022222222', nyscCallUpNumber: 'OY/23B/2345', lodge: 'Ibadan North', status: 'active', digitalIdStatus: 'pending', createdAt: '2025-09-05T10:00:00Z' },
    { id: 'm3', name: 'Fatima Idris', email: 'fatima@example.com', role: 'member', state: 'Ogun', phone: '+2348033333333', nyscCallUpNumber: 'OG/23C/3456', lodge: 'Abeokuta South', status: 'pending', digitalIdStatus: 'not_requested', createdAt: '2025-10-01T10:00:00Z' },
    { id: 'm4', name: 'Ibrahim Musa', email: 'ibrahim@example.com', role: 'member', state: 'Osun', phone: '+2348044444444', nyscCallUpNumber: 'OS/23D/4567', lodge: 'Ife Central', status: 'active', digitalIdStatus: 'approved', createdAt: '2025-10-10T10:00:00Z' },
    { id: 'm5', name: 'Zainab Abubakar', email: 'zainab@example.com', role: 'member', state: 'Ondo', phone: '+2348055555555', nyscCallUpNumber: 'ON/23E/5678', lodge: 'Akure South', status: 'completed', digitalIdStatus: 'approved', createdAt: '2025-07-15T10:00:00Z' },
    { id: 'm6', name: 'Suleiman Dauda', email: 'suleiman@example.com', role: 'member', state: 'Ekiti', phone: '+2348066666666', nyscCallUpNumber: 'EK/23F/6789', lodge: 'Ado Ekiti', status: 'active', digitalIdStatus: 'pending', createdAt: '2025-10-20T10:00:00Z' },
    { id: 'm7', name: 'Aminat Lawal', email: 'aminat@example.com', role: 'member', state: 'Lagos', phone: '+2348077777777', nyscCallUpNumber: 'LA/24A/7890', lodge: 'Ikeja', status: 'pending', digitalIdStatus: 'not_requested', createdAt: '2025-11-01T10:00:00Z' },
    { id: 'm8', name: 'Kabir Ogunlade', email: 'kabir@example.com', role: 'member', state: 'Ogun', phone: '+2348088888888', nyscCallUpNumber: 'OG/24B/8901', lodge: 'Sagamu', status: 'active', digitalIdStatus: 'rejected', createdAt: '2025-11-05T10:00:00Z' },
    { id: 'm9', name: 'Hauwa Garba', email: 'hauwa@example.com', role: 'member', state: 'Oyo', phone: '+2348099999999', nyscCallUpNumber: 'OY/24C/9012', lodge: 'Ibadan South West', status: 'active', digitalIdStatus: 'approved', createdAt: '2025-11-10T10:00:00Z' },
    { id: 'm10', name: 'Yusuf Abdullahi', email: 'yusuf@example.com', role: 'member', state: 'Osun', phone: '+2348100000000', nyscCallUpNumber: 'OS/24D/0123', lodge: 'Ilesa', status: 'inactive', digitalIdStatus: 'not_requested', createdAt: '2025-08-20T10:00:00Z' },
    { id: 'm11', name: 'Rukaiya Sani', email: 'rukaiya@example.com', role: 'member', state: 'Lagos', phone: '+2348111111112', nyscCallUpNumber: 'LA/24E/1235', lodge: 'Surulere', status: 'active', digitalIdStatus: 'pending', createdAt: '2025-11-15T10:00:00Z' },
    { id: 'm12', name: 'Mustapha Bala', email: 'mustapha@example.com', role: 'member', state: 'Ondo', phone: '+2348121212121', nyscCallUpNumber: 'ON/24F/2346', lodge: 'Owo', status: 'active', digitalIdStatus: 'approved', createdAt: '2025-11-20T10:00:00Z' },
    { id: 'm13', name: 'Khadija Usman', email: 'khadija@example.com', role: 'member', state: 'Ekiti', phone: '+2348131313131', nyscCallUpNumber: 'EK/24A/3457', lodge: 'Ikere', status: 'pending', digitalIdStatus: 'not_requested', createdAt: '2025-12-01T10:00:00Z' },
    { id: 'm14', name: 'Abdulrahman Bello', email: 'abdul@example.com', role: 'member', state: 'Oyo', phone: '+2348141414141', nyscCallUpNumber: 'OY/24B/4568', lodge: 'Ogbomoso', status: 'active', digitalIdStatus: 'rejected', createdAt: '2025-12-05T10:00:00Z' },
    { id: 'm15', name: 'Maryam Aliyu', email: 'maryam@example.com', role: 'member', state: 'Lagos', phone: '+2348151515151', nyscCallUpNumber: 'LA/24C/5679', lodge: 'Eti-Osa', status: 'active', digitalIdStatus: 'pending', createdAt: '2025-12-10T10:00:00Z' },
  ]
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members))
}

seed()

function getStored(): Member[] {
  try {
    return JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]') as Member[]
  } catch {
    return []
  }
}

function save(data: Member[]) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(data))
}

export const membersApi = {
  async getMembers(): Promise<Member[]> {
    await delay()
    return getStored()
  },

  async createMember(data: import('@/features/members/types').CreateMemberPayload): Promise<Member> {
    await delay()
    const list = getStored()
    const member: Member = {
      id: `m${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'member',
      state: data.state,
      phone: data.phone || '',
      nyscCallUpNumber: data.nyscCallUpNumber || '',
      lodge: '',
      status: 'pending',
      digitalIdStatus: 'not_requested',
      createdAt: new Date().toISOString(),
    }
    list.push(member)
    save(list)
    return member
  },

  async getMember(id: string): Promise<Member | undefined> {
    await delay()
    return getStored().find((m) => m.id === id)
  },

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((m) => m.id === id)
    if (idx === -1) throw new Error('Member not found')
    list[idx] = { ...list[idx], ...data }
    save(list)
    return list[idx]
  },

  async deleteMember(id: string): Promise<void> {
    await delay()
    const list = getStored().filter((m) => m.id !== id)
    save(list)
  },

  async approveMember(id: string): Promise<Member> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((m) => m.id === id)
    if (idx === -1) throw new Error('Member not found')
    list[idx] = { ...list[idx], status: 'active' }
    save(list)
    return list[idx]
  },

  async rejectMember(id: string, reason?: string): Promise<Member> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((m) => m.id === id)
    if (idx === -1) throw new Error('Member not found')
    list[idx] = { ...list[idx], status: 'rejected' }
    save(list)
    return list[idx]
  },
}
